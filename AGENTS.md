# AGENTS.md

Instructions for AI coding agents working in this repository. Human docs are in Vietnamese under `docs/`; code, identifiers and commit messages are English.

## Project in one line

ReNER-VN extracts rent, area, location, rooms and fees from Vietnamese Facebook rental posts (Regex + grounded LLM + reconciliation) and compares a listing's asking rent with the median of similar listings. Course demo, runs locally.

## Source of truth (highest first)

1. `docs/02-data/01-tu-dien-du-lieu.md` and `spec/schemas/*.json` — field names, enums, meanings.
2. `docs/02-data/04-quy-tac-chuan-hoa.md` — normalization cases (each row is a test case).
3. `docs/02-data/05-gop-trung-va-thong-ke.md` — dedup, statistics eligibility, comparison rules.
4. `docs/03-system/03-api-contract.md`, `docs/03-system/04-co-so-du-lieu.md` — API and DB.
5. The GitHub issue you were assigned.

If these conflict or say nothing about a business rule: stop and ask in the issue. Do not invent rules, fields, endpoints or enum values.

## Commands

Not implemented yet. Planned: `make setup`, `make dev`, `make test`, `make seed`, `make eval`. Available now:

- `python spec/tools/check_fixtures.py` — validate fixtures against schemas and evidence offsets.

## Rules that are easy to break

- The LLM returns quotes + labels only. Deterministic code converts numbers. Drop any LLM value whose quote is not found in the post text.
- Missing value = `null` with a reason, never `0`. "ib giá" is `visibility = hidden_explicit`, not a price.
- Never multiply a per-person price. `basis` is `unknown` unless the text or a documented context rule says otherwise.
- Never add rent and fees into a total.
- Statistics: exact monthly rent only, same basis, one listing per cluster, exclude the target's whole cluster, `insufficient_data` when N < 10. The frontend never computes statistics.
- Evidence offsets are Unicode code points on the stored (phone-masked) text.
- Test-split gold labels must never be used in prompts, rules or tuning.
- Authorization is enforced in the API, not by hiding UI.
- The Gemini key lives only in the worker environment. Never in web, extension, logs or commits.
- No real scraped data, phone numbers or `.env` files in commits.

## Working style

- One issue, one branch, one PR. Touch only what the issue needs; no drive-by refactors.
- Write tests from the normalization table and `spec/fixtures/` before implementing pipeline logic.
- Report at the end: changed files, checks run with their output, what was not verified.
