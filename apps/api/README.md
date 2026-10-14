# apps/api — FastAPI + pipeline + worker

**Trạng thái:** chưa code. Phụ trách chính: TV2 (API, LLM, worker), TV1 (pipeline Regex, chuẩn hóa, đối chiếu).

## Cần xây

| Phần | Đặc tả |
|---|---|
| Endpoint | [API contract](../../docs/03-system/03-api-contract.md) |
| Bảng dữ liệu | [Cơ sở dữ liệu](../../docs/03-system/04-co-so-du-lieu.md) |
| Pipeline M0–M9 | [Pipeline xử lý](../../docs/02-data/03-pipeline-xu-ly.md), [quy tắc chuẩn hóa](../../docs/02-data/04-quy-tac-chuan-hoa.md), [gộp trùng và thống kê](../../docs/02-data/05-gop-trung-va-thong-ke.md) |
| Luồng job | [Luồng web](../../docs/03-system/02-luong-web.md) |
| Schema dữ liệu | [spec/schemas](../../spec/schemas/) |

## Cấu trúc dự kiến

```text
apps/api/
  app/
    main.py
    api/            ingest.py, analyses.py, listings.py, market.py, team.py, lab.py, eval.py
    core/           config.py, auth.py, db.py, errors.py
    models/         ORM
    schemas/        Pydantic, khớp spec/schemas
    pipeline/       preprocess, classify, regex_extractor, llm_extractor, normalize, reconcile, dedup, market
      lexicon/      abbreviations.yaml, regex_rules.yaml, places.yaml  (có version)
      prompts/      extract_v1.md
    worker/run.py
  tests/
    test_normalize.py     # sinh từ bảng trong 04-quy-tac-chuan-hoa.md
    test_pipeline.py      # chạy trên spec/fixtures
    test_api.py
  migrations/
  pyproject.toml
```

## Thứ tự làm đề xuất

1. Khung app + DB + `POST /ingest/batch` + worker rỗng → extension gửi được bài (mốc M1).
2. M1 tiền xử lý + M3a Regex + M4 chuẩn hóa, test bằng bảng quy tắc và fixture.
3. M3b LLM có neo nguồn + M5 đối chiếu; `POST /analyses`, `GET /analyses/{id}`.
4. Listings, comparison, market; M8 gộp trùng, M9 thống kê.
5. Team: reviews, posts, lab, eval.

## Nguyên tắc

- Khóa Gemini chỉ đọc từ biến môi trường ở worker; không log nội dung bài kèm khóa.
- Hàm chuẩn hóa và đối chiếu là hàm thuần, test không cần mạng hay DB.
- Không gọi LLM trong request HTTP.
- Mỗi lần chạy pipeline ghi đủ version để tái lập.
