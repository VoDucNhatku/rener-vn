"""M9 rules: worked example (gop-trung-va-thong-ke §6), AT08, AT09, AT17."""
from datetime import UTC, datetime, timedelta

from app.pipeline.market import (MarketConfig, MarketRow, compare, eligible_pool, percentile,
                                 verdict_sentence)

NOW = datetime(2026, 10, 25, tzinfo=UTC)
CFG = MarketConfig()


def row(i, price_tr, *, cluster=None, area=32.0, demo=False, **kw):
    base = dict(listing_id=f"L{i}", cluster_id=cluster or f"C{i}", is_demo=demo, contributed=True,
                review_status="auto_accepted", rent_form="exact", rent_vnd=int(round(price_tr * 1_000_000)),
                rent_period="month", rent_basis="per_unit", ward_code="W1", ward_name="Phường A",
                property_type="ccmn", area_m2=area, area_from_dimensions=False,
                observed_at=NOW - timedelta(days=i % 20))
    base.update(kw)
    return MarketRow(**base)


PRICES = [2.8, 3.0, 3.0, 3.1, 3.2, 3.3, 3.5, 3.5, 3.6, 3.8, 4.0, 4.2]


def test_worked_example():
    pool = [row(i, p) for i, p in enumerate(PRICES)]
    target = row(100, 3.9, cluster="T")
    c = compare(target, pool, CFG)
    assert c.status == "ok" and c.stats.n == 12
    assert c.stats.median == 3_400_000
    assert c.delta_percent == 14.7 and c.verdict == "higher"
    assert verdict_sentence(c).startswith("Cao hơn 14.7% so với trung vị của 12 tin")


def test_at08_nine_samples_is_insufficient():
    pool = [row(i, p) for i, p in enumerate(PRICES[:9])]
    c = compare(row(100, 3.9, cluster="T"), pool, CFG)
    assert c.status == "insufficient_data" and "too_few_samples" in c.reason_codes
    assert c.stats.median is None and c.delta_percent is None and c.verdict is None
    assert "mới có 9 tin" in verdict_sentence(c)


def test_at09_target_cluster_is_excluded():
    pool = [row(i, p) for i, p in enumerate(PRICES)]
    pool[0].cluster_id = "T"  # a repost of the target
    c = compare(row(100, 3.9, cluster="T"), pool, CFG)
    assert c.stats.n == 11


def test_one_listing_per_cluster_latest_wins():
    rows = [row(1, 3.0, cluster="C"), row(2, 3.5, cluster="C", observed_at=NOW)]
    pool, excluded = eligible_pool(rows, now=NOW, cfg=CFG, demo=False)
    assert [r.rent_vnd for r in pool] == [3_500_000]
    assert excluded == {"older_in_cluster": 1}


def test_at17_demo_never_mixed_with_real():
    rows = [row(i, p) for i, p in enumerate(PRICES)] + [row(50 + i, 9.0, demo=True) for i in range(5)]
    real, excluded = eligible_pool(rows, now=NOW, cfg=CFG, demo=False)
    assert len(real) == 12 and excluded["demo_data"] == 5
    demo, _ = eligible_pool(rows, now=NOW, cfg=CFG, demo=True)
    assert len(demo) == 5


def test_eligibility_reasons_are_counted():
    rows = [row(1, 3.0, rent_form="starting_from"), row(2, 3.0, rent_basis="unknown"),
            row(3, 3.0, ward_code=None), row(4, 3.0, rent_period="day"),
            row(5, 3.0, review_status="needs_review"), row(6, 3.0, contributed=False),
            row(7, 3.0, observed_at=NOW - timedelta(days=45))]
    pool, excluded = eligible_pool(rows, now=NOW, cfg=CFG, demo=False)
    assert pool == []
    assert excluded == {"price_not_exact": 1, "basis_unknown": 1, "ward_unresolved": 1,
                        "period_not_month": 1, "not_accepted": 1, "not_contributed": 1,
                        "outside_window": 1}


def test_basis_groups_are_separate():
    pool = [row(i, p) for i, p in enumerate(PRICES)]
    c = compare(row(100, 1.5, cluster="T", rent_basis="per_person"), pool, CFG)
    assert c.status == "insufficient_data" and c.stats.n == 0


def test_not_comparable_reasons():
    c = compare(row(100, 3.0, cluster="T", rent_form="starting_from"), [], CFG)
    assert c.status == "not_comparable" and c.reason_codes == ["price_not_exact"]
    assert verdict_sentence(c, "starting_from") == "Bài ghi giá dạng từ…, chưa so sánh được."
    c = compare(row(101, 3.0, cluster="T", rent_basis="unknown", ward_code=None), [], CFG)
    assert c.reason_codes == ["basis_unknown", "ward_unresolved"]


def test_missing_area_uses_broad_group():
    pool = [row(i, p, area=15 + i * 4) for i, p in enumerate(PRICES)]
    c = compare(row(100, 3.4, cluster="T", area=None), pool, CFG)
    assert c.criteria["broad_group"] is True and "area_missing_broad_group" in c.reason_codes
    assert c.stats.n == 12 and c.status == "ok"


def test_price_per_m2_is_median_of_ratios():
    pool = [row(i, 3.0, area=a) for i, a in enumerate([30, 31, 32, 33, 34, 35, 36, 37, 38, 39])]
    c = compare(row(100, 3.0, cluster="T", area=34), pool, CFG)
    ratios = sorted(3_000_000 / a for a in [30, 31, 32, 33, 34, 35, 36, 37, 38, 39])
    assert c.stats.median_per_m2 == round(percentile(ratios, 0.5))


def test_near_band_is_configurable():
    pool = [row(i, p) for i, p in enumerate(PRICES)]
    c = compare(row(100, 3.6, cluster="T"), pool, MarketConfig(near_percent=5))
    assert c.verdict == "higher"
    c = compare(row(100, 3.6, cluster="T"), pool, CFG)
    assert c.verdict == "near"
