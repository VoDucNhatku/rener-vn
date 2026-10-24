# Prompt cho chat mới: nối web với backend

Sao chép toàn bộ nội dung trong khối dưới vào chat mới. Nếu chat mới truy cập được file này, có thể yêu cầu đọc file và thực hiện prompt. Phạm vi là **B0/B1** của [kế hoạch hoàn thiện](04-ke-hoach-hoan-thien-2026-10-24.md).

Đã cập nhật theo gói Stitch ngày 24/10. Đọc [hướng dẫn Stitch](06-huong-dan-su-dung-stitch.md) để biết bố cục mục tiêu và các nội dung cần sửa; việc chuyển visual toàn màn là **B1-UI**, sau khi phần nối dữ liệu đã được kiểm chứng.

```text
Hãy trực tiếp thực hiện phần nối frontend Next.js với backend FastAPI cho ReNER-VN, bao gồm thiết lập môi trường cần thiết, sửa mã, chạy kiểm tra và bật localhost để tôi xem. Đây là yêu cầu triển khai, không chỉ lập kế hoạch.

1. Workspace và bối cảnh

- Repo cần làm: F:\TMG Final Project\rener-vn-latest
- Thư mục F:\TMG Final Project\rener-vn là bản cũ có commit riêng; làm việc trong rener-vn-latest.
- Repo nguồn: https://github.com/VoDucNhatku/rener-vn.git
- Bản đã kiểm tra khi lập kế hoạch: ea62867. Kiểm tra HEAD và git status hiện tại trước khi sửa, bảo toàn mọi thay đổi có sẵn; không reset, không tự pull/merge làm thay đổi nền đang làm.
- Đã cài npm dependencies cho apps/web. Web từng chạy cổng 3000; kiểm tra tiến trình hiện tại trước khi mở thêm. Chỉ dừng tiến trình thuộc tác vụ này khi cần khởi động lại.
- Backend chưa được kiểm chứng trong chat chuẩn bị. Chưa có bằng chứng chạy pytest, Gemini thật hay toàn luồng.
- Có gói tham chiếu thiết kế tại F:\TMG Final Project\rener-vn-latest\stitch_rener_rental_intelligence_platform.zip. Đây là 17 HTML màn/trạng thái, 2 logo SVG base64, 23 PNG và 2 Markdown, không phải frontend đã tích hợp hoặc extension.
- Bản giải nén tham chiếu nằm trong .tmp\stitch-reference-2026-10-24\stitch_rener_rental_intelligence_platform; kiểm tra trước khi dùng. Nếu thiếu, giải nén an toàn từ ZIP vào thư mục tham chiếu mới, không ghi đè app. ZIP và tài liệu kế hoạch có thể đang untracked; bảo toàn chúng.
- Tạo branch feat/web-api-integration từ trạng thái hiện tại nếu chưa ở branch làm việc phù hợp. Tuân thủ AGENTS.md và CONTRIBUTING.md. Chưa cần push, mở PR hoặc merge.

2. Đọc tài liệu và code trước khi thay đổi

Đọc AGENTS.md và tài liệu B0/B1:
docs/05-delivery/04-ke-hoach-hoan-thien-2026-10-24.md

Đọc thêm mapping và giới hạn của thiết kế mới:
- docs/05-delivery/06-huong-dan-su-dung-stitch.md
- docs/PRODUCT.md
- Trong ZIP/bản giải nén: warm_analytical_clarity/DESIGN.md, bảng RBAC và code.html/screen.png của trang_ch_rener, trang_2_t_m_tr_rener, trang_3_chi_ti_t_ph_ng_rener.

Đọc nguồn nghiệp vụ theo thứ tự trong AGENTS.md:
- docs/02-data/01-tu-dien-du-lieu.md và spec/schemas/
- docs/02-data/04-quy-tac-chuan-hoa.md
- docs/02-data/05-gop-trung-va-thong-ke.md
- docs/03-system/03-api-contract.md, docs/03-system/04-co-so-du-lieu.md
- docs/03-system/02-luong-web.md
- docs/01-product/03-tinh-nang-va-man-hinh.md
- docs/05-delivery/02-demo-va-nghiem-thu.md
- apps/api/README.md, apps/web/README.md

Đọc trực tiếp các nhóm code liên quan:
- apps/web/src/lib/api/client.ts, types.ts, mock-data.ts, local-samples.ts
- apps/web/src/app/(renter)/page.tsx
- apps/web/src/app/(renter)/tim-tro/page.tsx
- apps/web/src/app/(renter)/tin/[id]/page.tsx
- apps/web/src/features/listings/ và features/listing-detail/
- apps/web/src/components/EvidenceHighlighter/, PriceDistributionBar/
- apps/web/src/lib/format.ts
- apps/api/app/api/routes.py, deps.py
- apps/api/app/schemas/, services/listings.py, serialize.py, market.py, seed.py
- apps/api/app/core/config.py, db.py, app/cli.py và worker/run.py
- .env.example, scripts/dev.ps1, Makefile và các test backend liên quan.

3. Mục tiêu và giới hạn phạm vi

Làm cho các trang đang có sử dụng API/DB thật:
- Trang chủ: số liệu kho từ GET /api/v1/stats/overview.
- /tim-tro: danh sách, lọc, sắp xếp, phân trang từ GET /api/v1/listings.
- /tin/[id]: dữ liệu từ GET /api/v1/listings/{id} và /comparison.
- Mọi trạng thái loading, rỗng, thiếu dữ liệu, lỗi/timeout, 404 và thử lại phải thể hiện đúng.

Trong B0/B1, giữ giao diện đang chạy để kiểm chứng dữ liệu, chỉ sửa UI cần cho phân trang/trạng thái. Dùng cấu trúc adapter/component có thể tái sử dụng cho Stitch. Theo kế hoạch mới, S0 chuẩn hóa thiết kế và B1-UI chuyển visual ba trang là các gói riêng; không tự chuyển toàn bộ 12 màn trong chat nối API. Chưa làm toàn bộ trang team, đăng nhập, extension, Lab, Đánh giá hoặc Thị trường. Chưa cần Gemini để hoàn thành bước này.

Nguyên tắc khi đọc Stitch:
- Dùng làm blueprint bố cục và trạng thái, không chép HTML nguyên trang vào Next.js, không thêm Tailwind runtime CDN chỉ để chạy export.
- Đặc tả/schema/API vẫn là nguồn nghiệp vụ. Mẫu có PhoBERT/CRF, F1 94,8%, token vô thời hạn, ảnh phòng AI xác thực, IP/SSO và huy hiệu an toàn; đây không phải khả năng đã có của dự án. Không đưa chúng vào UI thật nếu API không cung cấp.
- Không dùng ảnh minh họa như ảnh thực tế của listing, không tự mở rộng enum sang loại ở ghép/gác xép; basis per_person khác với post_type roommate.
- Tên TrọCheck/ReNER trong ZIP còn lẫn nhau; giữ ReNER-VN/ReNER trong B1. Chưa đổi brand hoặc palette toàn hệ thống.
- Hai file logo code.html là SVG base64, không phải React component hay HTML trang. Chỉ xử lý asset ở gói chuyển UI phù hợp.

4. Thiết lập môi trường và kiểm tra ban đầu

- Lập kế hoạch ngắn, kiểm tra git và môi trường; ghi lại lỗi có sẵn trước khi sửa.
- Backend cần Python >= 3.11. Tạo .venv trong apps/api nếu cần, cài dependency dev, chạy migration bằng CLI có sẵn.
- Kiểm tra đường dẫn DATABASE_URL. Ưu tiên đường dẫn SQLite tuyệt đối dưới repo để seed/API/worker cùng mở một DB. Không ghi đè hoặc xóa database đang có; dùng database phát triển riêng nếu cần.
- Tạo/cập nhật cấu hình local có kiểm tra trước khi ghi: .env ở gốc cho API, apps/web/.env.local cho Next.js. Next.js không tự nạp .env ở gốc repo khi chạy trong apps/web.
- .env.example hiện dùng NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1; comment trong client lại nhắc NEXT_PUBLIC_API_URL. Chọn một tên nhất quán, cập nhật tài liệu. Với fetch phía server, ưu tiên biến server-only nếu phù hợp; không đưa secret vào biến NEXT_PUBLIC_*.
- Sinh secret/mật khẩu local hợp lý và không in vào log, code hoặc tài liệu chia sẻ. CLI seed hiện đọc SEED_PASSWORD từ môi trường tiến trình; kiểm tra thay vì giả định đặt trong .env là đủ.
- Seed dữ liệu demo qua CLI có sẵn, bật DEMO_MODE=true cho môi trường demo. Seed đã xử lý job bằng drain Regex; vẫn khởi động worker riêng và kiểm tra trạng thái khi cần.
- Không đòi Gemini key để nối các endpoint đọc công khai. Thiếu key thì ghi đúng chế độ Regex-only.
- Chạy pytest/import-linter/check_fixtures và typecheck/build ban đầu khi có đủ môi trường; ghi rõ lỗi nào có sẵn và lỗi nào do thay đổi.

5. Thiết kế tích hợp

A. DTO và client
- Đối chiếu response thực tế với schema và code serialize. Hiện routes thường trả dict, chưa có response model đủ chi tiết; đừng chỉ sinh client từ OpenAPI rỗng rồi ép kiểu để bỏ lỗi.
- Bổ sung response model cho các endpoint cần trong phạm vi B1, bảo toàn các trường response đang có và nullable đúng. Không sửa nghiệp vụ pipeline để chiều giao diện.
- Sinh type/client từ OpenAPI bằng công cụ phù hợp với TypeScript, có lệnh sinh lại. Tách type được sinh với adapter/type phục vụ UI; không sửa tay file sinh. Bổ sung test hợp đồng cho những response đã khai báo.
- Các trang hiện là Server Components: ưu tiên lớp fetch server tới FastAPI, tránh thêm proxy hay thư viện quản lý state nếu chưa cần.
- Lớp HTTP phải có timeout, xử lý lỗi JSON chuẩn và lỗi mạng; phân biệt 404 với 5xx/timeout. Dữ liệu động không bị giữ cache cũ sau khi xử lý/duyệt; giai đoạn đầu có thể dùng cache: no-store.
- Trong chế độ API không tự fallback sang mock hoặc đọc extension-sample.json. Các hàm mock chưa dùng cho màn hình ngoài phạm vi phải được tách/ghi rõ để tránh gọi nhầm.

B. Những điểm khác biệt đã phát hiện
- API trả is_demo; web đang dùng origin: demo|extension. Dùng is_demo cho badge demo; không gán tất cả dữ liệu thật thành nguồn extension vì backend còn nhận manual_paste/import_file.
- Bộ lọc nguồn nguon=that|vidu và localSampleCount là đặc thù prototype đọc file. Điều chỉnh hoặc ẩn trong chế độ API; không trộn dữ liệu thật và demo trong một danh sách.
- Khi DEMO_MODE=false, server chỉ phục vụ dữ liệu thật; khi true, demo_flag mặc định chọn demo, ?demo=false chọn thật. Giữ cùng lựa chọn cho listings/detail/comparison/stats; link sang chi tiết không được mất chế độ dữ liệu.
- data_as_of, updated_at, data_from/data_to có thể null: không hiện Invalid Date hay ngày giả.
- /listings có page/page_size; frontend cũ không có phân trang. Hiển thị total và điều hướng trang, giữ bộ lọc khi chuyển trang, đặt lại trang khi lọc/sort.
- Mảng query thực tế dùng key lặp ward=...&ward=... và type=...&type=..., không tự chuyển thành chuỗi dấu phẩy hoặc ward[]. Kiểm tra theo OpenAPI đang chạy.
- Giữ URL tiếng Việt hiện có; chuyển giá từ triệu sang đồng đúng một lần ở lớp parseFilters. Để API lọc/sắp xếp và trả hidden_no_price.
- API chưa có endpoint danh mục phường. Cách làm ban đầu: lấy tên phường duy nhất từ các trang /listings không lọc, cùng chế độ dữ liệu, tái sử dụng trong request. Không chỉ lấy trang đầu hoặc trang đang lọc; không dùng /market/summary làm danh mục đầy đủ. Nếu cần endpoint mới thì ghi rõ lý do/hợp đồng, không tự đặt nghiệp vụ.
- Card API hiện có thể trả verdict/delta_percent là null; cho phép không có nhãn nhận định. Không tính ở web hoặc gọi comparison cho mọi card chỉ để trang trí.
- Comparison có message/disclaimer/is_demo. Hiển thị nhận định và số liệu từ API; không tự dựng kết luận khi status không phải ok.

C. Trang chủ và chi tiết
- Trang chủ đang gọi getListing/getComparison với ID mock l-01 và l-10. Tách minh họa tự tạo thành dữ liệu minh họa được ghi rõ, hoặc dùng phương án tương thích đặc tả trang chủ; không gửi các ID này tới backend.
- Phần giới thiệu/minh họa vẫn hiện khi kho rỗng hoặc stats lỗi. Số tin và ngày cập nhật phải phản ánh API, badge demo đúng thực tế.
- Listing 404 thật thì notFound. Comparison lỗi không được làm cả trang chi tiết thành 404; vẫn hiện nội dung bài và lỗi cục bộ vùng so sánh. Chú ý generateMetadata cũng đang gọi getListing.
- Có loading/error/retry, trạng thái không có kết quả khác kho chưa có tin; giữ bằng chứng và hành vi bấm trường để highlight.
- Bảo toàn Unicode code point/emoji, null, giá dạng khoảng/từ, giá/người, phí tách riêng và text_complete=false.

6. Nguyên tắc nghiệp vụ

- Không đổi thiếu dữ liệu thành 0; không tự cộng rent và fees hay nhân giá/người.
- UI chỉ hiển thị thống kê từ API: cùng basis, đúng nhóm, một listing/cluster, loại cả cluster tin đích, N < 10 báo thiếu.
- Dữ liệu demo không vào thống kê thật hoặc đánh giá; dữ liệu gold cũng không vào kho thị trường.
- Không mở rộng quyền API để làm UI hoạt động. Các endpoint công khai trong B1 không đòi phải xây login UI trước.
- Không sửa ngưỡng, schema hay enum nghiệp vụ khi chưa có căn cứ. Nếu tài liệu xung đột, mô tả chính xác điểm xung đột và tiếp tục phần độc lập trong lúc chờ quyết định.

7. Kiểm thử và bằng chứng bắt buộc

Chạy các lệnh dưới đúng thư mục sau khi đã thiết lập môi trường:
- Trong apps/api: .\.venv\Scripts\python.exe -m pytest
- Trong apps/api: .\.venv\Scripts\lint-imports.exe
- Tại repo root: .\apps\api\.venv\Scripts\python.exe spec\tools\check_fixtures.py
- Trong apps/web: npm run typecheck và npm run build
- Chạy lệnh sinh client và test tích hợp mới theo script đã thêm.

Không mặc định npm run lint hoạt động: package hiện trỏ next lint, cần kiểm công cụ thực tế của Next.js 15 trước khi ghi là đã lint. Không thay toolchain toàn repo chỉ để hoàn thành B1.

Các ca phải kiểm trên API thật/trình duyệt:
1) Seed -> API listings -> /tim-tro -> mở ID thật -> chi tiết/evidence/comparison. So một vài giá trị với response API và ghi bằng chứng.
2) Nhiều hơn 20 tin; phân trang không mất bộ lọc; đổi bộ lọc về trang đầu; nhiều phường/loại truyền đúng.
3) hidden_no_price, ib giá, giá từ/khoảng, giá/người, emoji và ngày null.
4) Không có kết quả, DB rỗng, demo bật/tắt, ID sai -> 404.
5) API dừng/timeout -> thông báo và thử lại, không mock fallback; comparison lỗi riêng thì nội dung tin vẫn đọc được.
6) Build không cần vô tình fetch API đang chạy ở bước prerender; dữ liệu runtime vẫn cập nhật sau thay đổi trong DB.
7) Desktop/mobile, bàn phím, không có lỗi runtime/hydration; chụp bằng chứng các trạng thái chính.

Nếu kiểm luồng ingest -> worker -> listing bằng bài tự tạo, dùng DB kiểm thử cô lập hoặc cơ chế demo có sẵn. Không giả định source_type=fixture qua POST /ingest/batch tự gắn is_demo: route hiện không làm điều đó. Không chèn bài tự tạo thành dữ liệu thật vào kho người dùng. Bài needs_review không tự công khai; kiểm trạng thái và duyệt hợp lệ nếu ca kiểm cần. Không sửa trực tiếp cờ để lách nghiệp vụ.

Không chạy tập test gold hay tạo tag eval-freeze-v1 trong giai đoạn này. Chỉ thêm test có ý nghĩa cho hợp đồng dữ liệu, lỗi và hành vi tích hợp, không viết test lặp lại code để đủ số lượng.

8. Hoàn tất và báo cáo

- Cập nhật README gốc/web/API và ví dụ cấu hình trong phạm vi đã triển khai, đặc biệt các câu vẫn ghi chưa có code hoặc web luôn dùng mock.
- Ghi lệnh cài/chạy/sinh type/kiểm tra cho Windows; ghi rõ vị trí env, chế độ demo và database. Giữ đường dẫn có dấu cách hoạt động.
- Bật API ở localhost:8000, web ở localhost:3000 và worker nếu đã thiết lập; xác nhận health và trang web, mở localhost cho tôi xem nếu có công cụ.
- Báo cáo ngắn: thay đổi, file chính, các lệnh kiểm tra và kết quả, URL, phần chưa kiểm chứng và bước tiếp theo. Không khẳng định toàn bộ dự án đã hoàn thiện.
- Hoàn thành phạm vi B0/B1 trước, tránh tự mở rộng sang B1-UI hoặc B2–B7. Khi bàn giao, nêu điểm component/data đã sẵn sàng cho bước chuyển Stitch. Không tạo chat, gửi tin sang chat khác, push/merge hoặc public site nếu tôi chưa yêu cầu.
```
