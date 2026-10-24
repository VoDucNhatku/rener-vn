# Kế hoạch hoàn thiện ReNER-VN

Ngày lập: **24/10/2026**, múi giờ Việt Nam. Mã nguồn đối chiếu: `ea62867` trên `main`.

Workspace thực thi: `F:\TMG Final Project\rener-vn-latest`.

**Cập nhật cùng ngày sau khi nhận Stitch:** đã kiểm tra `stitch_rener_rental_intelligence_platform.zip`. Bộ này bổ sung blueprint cho phần lớn màn hình, không bổ sung backend hay frontend đã tích hợp. Thêm S0 và B1-UI vào kế hoạch; xem [hướng dẫn và bảng đối chiếu Stitch](06-huong-dan-su-dung-stitch.md).

**Tiến độ thực thi 24/10:** B0/B1 có [bàn giao môi trường/API](07-ket-qua-b0-b1-2026-10-24.md). S0 và B1-UI đã hoàn thành trong phạm vi ba trang công khai; token/component specification ở [Design](../DESIGN.md), kiểm tra và ảnh ở [bàn giao S0/B1-UI](08-ket-qua-s0-b1-ui-2026-10-24.md). Các checkbox B0/B1 bên dưới là checklist kế hoạch gốc; xem bàn giao 07 để biết bằng chứng đã chạy trước lượt UI.

Tài liệu này là kế hoạch triển khai tiếp từ mã nguồn hiện có. Các quy tắc nghiệp vụ vẫn theo `AGENTS.md`, từ điển dữ liệu, schema và các đặc tả gốc. Kế hoạch không xác nhận hệ thống đã qua nghiệm thu.

## 1. Mục tiêu và phạm vi hoàn thành

### 1.1. Ba kết quả cần bàn giao

1. **Sản phẩm chạy xuyên suốt:** extension gửi bài → API lưu và tạo job → worker xử lý → người có quyền duyệt nếu cần → người thuê tìm tin, xem bằng chứng và nhận định giá.
2. **Kết quả NLP có thể kiểm tra lại:** dữ liệu có nhãn, split khóa theo cụm phòng, so sánh Regex/LLM/Hybrid, manifest và phân tích lỗi cho RQ1–RQ4.
3. **Bộ bàn giao chạy được trên máy trình bày:** hướng dẫn cài, cấu hình, tài khoản, dữ liệu demo tách biệt, báo cáo, slide, kịch bản và video dự phòng.

### 1.2. Mức ưu tiên

| Mức | Phạm vi |
|---|---|
| Bắt buộc theo đặc tả P0 | F01–F10: extension hai chế độ, pipeline, Tìm trọ, Chi tiết, nhận định, Duyệt, Lab, Đánh giá, đăng nhập/phân quyền |
| Hỗ trợ vận hành P0 | Kho bài và trạng thái job, cấp/thu hồi token, cấu hình nguồn được phép, `/phan-tich/[id]`, hướng dẫn chạy và nghiệm thu |
| P1 theo đặc tả | Thị trường đầy đủ, dán bài trên web, nhập file theo lô, lưu tin yêu thích |
| Đề xuất làm sớm trong P1 | Dán bài để dự phòng extension; bảng Thị trường tối giản phục vụ kịch bản demo nếu tiến độ cho phép |
| Sau đồ án | Bản đồ, thông báo, mô hình huấn luyện riêng, mở rộng địa bàn, triển khai công khai và tối ưu cho tải lớn |

Nếu phải giảm phạm vi, ưu tiên hoãn yêu thích, biểu đồ xu hướng và hiệu ứng mới. Việc thiếu một hạng mục P0 cần được ghi rõ; đường dự phòng không tự động thay thế tiêu chí nghiệm thu extension.

## 2. Hiện trạng đã kiểm tra (bảng gốc, cập nhật web sau B1-UI)

| Thành phần | Đã có trong repo | Cần làm hoặc xác minh |
|---|---|---|
| Web Next.js 15 / React 19 | `/`, `/tim-tro`, `/tin/[id]`, bộ lọc URL, bôi màu evidence, thanh phân bố giá | Đã nối FastAPI ở B1 và chuyển Stitch ở B1-UI, có kiểm hồi quy; khu nhóm/đăng nhập chưa triển khai |
| Thiết kế Stitch mới | 17 HTML màn/trạng thái, 2 logo SVG base64, 23 PNG, DESIGN.md và bảng RBAC | Đã có blueprint cho 12 màn chính; phải chuyển sang component, nối dữ liệu và sửa nội dung lệch nghiệp vụ |
| API FastAPI | Routes cho auth, ingest, analyses, listings, comparison, market, team, Lab, eval | Chạy migration, test và kiểm tra response thực tế; hoàn thiện OpenAPI response cho phần tích hợp |
| SQLite và worker | ORM, Alembic, job worker, seed và CLI | Kiểm tra dùng chung database, trạng thái job, retry, chạy lại sau khi dừng |
| Pipeline M0–M9 | Regex, LLM có neo nguồn, chuẩn hóa, đối chiếu, gộp trùng, thống kê | Hiệu chỉnh trên pilot/dev và thử Gemini thật; mã có sẵn chưa chứng minh chất lượng trên dữ liệu thật |
| Extension | README và đặc tả bàn giao | Chưa có mã nguồn trong `apps/extension`; xác minh có bản bên ngoài trước khi xây mới |
| Dữ liệu | 7 fixture, bộ sinh bài demo; quy ước gold và kho thị trường | Chưa kiểm kê dữ liệu riêng của nhóm; từ điển phường/địa điểm thật còn trống |
| Đánh giá | `eval/run_eval.py`, test và API đọc kết quả | Chưa có nhánh LLM-raw cho RQ2 theo README API; cần đối chiếu đủ chỉ số và RQ4 |
| Tài liệu | Đặc tả sản phẩm, API, pipeline, đánh giá và AT01–AT18/E1–E12 | README gốc và một số README thành phần còn ghi trạng thái cũ |

**Bản ghi phiên lập kế hoạch trước thực thi:** Đã từng khởi động web và nhận HTTP 200 tại `http://localhost:3000`. Phiên lập kế hoạch này **chưa chạy backend, bộ test, Gemini hay kiểm thử toàn luồng**. Khi bắt đầu thực thi phải kiểm tra lại tiến trình và trạng thái git.

## 3. Phụ thuộc và cách tổ chức công việc

```text
S0 Chuẩn hóa Stitch ──→ B1-UI Chuyển 3 trang hiện có ──→ UI dùng chung B2/B3/B6
B0 Môi trường → B1 Nối web/API ──↑
                     └──────→ B2 Auth/Kho/Token → B3 Duyệt/Lab/Phân tích
                                      └───────→ B4 Extension → luồng Facebook
B5 Khu vực + pilot + gold + kho ───────→ B6 NLP/đánh giá/đóng băng
B1 + B1-UI + B2 + B3 + B4 + B5 + B6 → B7 Nghiệm thu và bàn giao
```

B5 cần bắt đầu ngay, không đợi giao diện hoàn tất. Người phụ trách extension có thể làm khung và trang HTML mẫu khi B1 đang chạy; phải thống nhất token và cấu hình nhóm với B2 trước tích hợp thật. Đây là cách phân công cho nhóm, không phải yêu cầu tự tạo thêm chat hay subagent.

S0 chốt thiết kế dùng chung để B2/B3/B6 phát triển theo cùng hướng. B1-UI thực hiện sau khi B1 qua kiểm tra dữ liệu, có thể xen kẽ với các màn mới; không bắt backend/auth hoặc công việc dữ liệu chờ toàn bộ giao diện được chuyển đổi. Chat nối backend vẫn thực hiện B0/B1 trước.

| Vai trò | Trách nhiệm chính | Review chéo |
|---|---|---|
| TV1 – NLP | Quy tắc, nhãn, gold, chỉ số, hiệu chỉnh và RQ1–RQ4 | TV2 |
| TV2 – Backend | Môi trường, API/DB/worker, DTO, auth, tích hợp Gemini | TV1 cho nghiệp vụ; TV3 cho API web |
| TV3 – Frontend | S0, B1/B1-UI, chuyển blueprint Stitch cho màn nhóm, trạng thái UI và kiểm thử trình duyệt | TV2 |
| TV4 – Extension/Data | Extension, nguồn thu, kho thị trường, kiểm tay dữ liệu | TV2 và TV1 |

Mỗi gói việc tạo issue và branch riêng khi triển khai theo `CONTRIBUTING.md`; danh sách dưới đây chưa phải issue đã được tạo trên GitHub. Không gộp thay đổi luật thống kê, làm extension và nối web vào cùng một PR.

## 4. Backlog triển khai

### S0. Tiếp nhận và chuẩn hóa thiết kế Stitch

**Phụ trách:** TV3, TV1/TV2 đối chiếu nghiệp vụ. **Trạng thái:** hoàn thành token/component specification; public component đã triển khai, component nhóm/token panel là hợp đồng cho giai đoạn sau.

- [x] Kiểm kê ZIP, đọc DESIGN/RBAC/HTML và xem bộ ảnh; giải nén tham chiếu vào `.tmp/stitch-reference-2026-10-24`.
- [x] Lập bản đồ 17 màn/trạng thái sang route/gói việc và liệt kê nội dung không khớp API trong [hướng dẫn Stitch](06-huong-dan-su-dung-stitch.md).
- [x] Chuẩn hóa palette, typography, spacing và trạng thái thành một nguồn token; giải quyết khác biệt giữa frontmatter DESIGN, diễn giải DESIGN, HTML và CSS đang có.
- [x] Chốt component chung: public header/team shell, form/table/pagination, evidence/comparison, token panel, lỗi/rỗng/loading.
- [x] Giữ tên ReNER-VN/ReNER ở bước tích hợp; quyết định dùng thương hiệu/logo TrọCheck nếu có phải được ghi riêng trước khi thay đồng loạt.
- [x] Gắn từng control trong mockup với API/quyền/state; những tính năng chưa có hợp đồng đưa vào P1 hoặc backlog riêng.

**Đầu ra:** [token/component spec và control/API mapping](../DESIGN.md) đã chốt và áp dụng vào ba trang; bảng mapping toàn bộ màn ở hướng dẫn 06. Shell nhóm/form/table/dialog/token panel chỉ được chốt specification, không đánh dấu đã triển khai. Không lấy PhoBERT, F1, ảnh phòng/AI xác thực hoặc các KPI trong ZIP làm yêu cầu nghiệp vụ mới.

### B0. Xác lập môi trường và kết quả ban đầu

**Phụ trách:** TV2. **Ước lượng:** 0,5–1 ngày công.

- [ ] Kiểm tra đúng workspace mới, git status, phiên bản Node/npm/Python; Python yêu cầu từ 3.11.
- [ ] Kiểm tra tiến trình cổng 3000/8000 trước khi khởi động; giữ lại thay đổi đang có.
- [ ] Tạo virtualenv, cài dependency, chạy migration trên database local dành cho dự án.
- [ ] Cấu hình `.env` cho API và `.env.local` cho Next.js. Next.js chạy trong `apps/web` không tự đọc `.env` ở gốc repo.
- [ ] Dùng đường dẫn SQLite nhất quán/đường dẫn tuyệt đối để seed, API, worker không vô tình mở các file khác nhau. `.env.example` hiện có đường dẫn tương đối cần kiểm tra theo thư mục chạy.
- [ ] Tạo secret và mật khẩu local; không đưa bí mật vào tài liệu hoặc output chia sẻ. Kiểm tra cách CLI nhận `SEED_PASSWORD`: hiện CLI đọc biến môi trường tiến trình, không lấy trường này từ `Settings`.
- [ ] Seed dữ liệu tự tạo, bật `DEMO_MODE=true` khi xem demo. Seed hiện có bước xử lý job bằng Regex; không coi việc seed xong là bằng chứng worker nền đã được kiểm tra.
- [ ] Chạy pytest, import-linter, kiểm fixture; ghi lệnh, phiên bản và lỗi ban đầu. Kiểm tra typecheck/build của web.
- [ ] Kiểm tra script PowerShell: đường dẫn có dấu cách, mã thoát khi lệnh lỗi, tác vụ được hỗ trợ và cách dừng đúng tiến trình. README có nhắc `lint` nhưng script hiện chưa có target này.

**Đầu ra:** môi trường tái lập được, bản ghi kiểm tra ban đầu, API health truy cập DB thành công. Chưa cần Gemini để bắt đầu B1.

### B1. Nối web hiện có với backend — thực hiện đầu tiên

**Phụ trách:** TV3 + TV2 review. **Phụ thuộc:** B0. **Ước lượng:** 1–2 ngày công, tùy lỗi hợp đồng dữ liệu.

**Phạm vi:** trang chủ, Tìm trọ, chi tiết, comparison và các trạng thái liên quan. Trong B1 giữ giao diện đang chạy để kiểm chứng dữ liệu; tham khảo Stitch cho trạng thái mới nhưng chuyển visual toàn màn ở B1-UI, tránh trộn thay đổi bố cục lớn với lỗi tích hợp.

| Việc | Cách thực hiện / điểm phải kiểm |
|---|---|
| B1.1 – Hợp đồng dữ liệu | Đọc response thực tế, schema và serializer. Routes hiện trả dict, nhiều response chưa khai báo model nên OpenAPI tự sinh có thể thiếu kiểu; bổ sung response model cho endpoint cần dùng rồi sinh type/client. Không ép kiểu JSON thành kiểu web mà chưa đối chiếu. |
| B1.2 – Lớp HTTP | Các trang hiện là Server Components: ưu tiên fetch phía server tới FastAPI, cấu hình base URL rõ ràng, timeout và lỗi có mã. Không âm thầm quay về mock khi API lỗi. |
| B1.3 – Trang chủ | Số liệu kho lấy từ `/stats/overview`. Các minh họa tự tạo được giữ và ghi rõ; bỏ phụ thuộc gọi API bằng ID mock `l-01`, `l-10`. Kho rỗng/API lỗi vẫn giữ phần giới thiệu. |
| B1.4 – Tìm trọ | Gọi `/listings`; chuyển URL `phuong/loai/gia_min/...` sang tham số API, đổi triệu sang đồng một lần, truyền nhiều `ward`/`type` bằng key lặp. Không lọc lại một trang dữ liệu ở frontend. |
| B1.5 – Phân trang | Truyền `page`, `page_size`; hiển thị total và điều hướng; đổi bộ lọc thì về trang đầu. Không tăng `page_size` để che việc thiếu phân trang. |
| B1.6 – Danh sách phường | Không còn lấy từ mock hoặc chỉ trang kết quả hiện tại. API chưa có endpoint danh mục: phương án ban đầu là đọc các trang `/listings` không lọc trong cùng chế độ dữ liệu để lấy tên phường duy nhất; tái sử dụng kết quả trong request. Không dùng `/market/summary` làm danh mục đầy đủ vì loại các tin không đủ điều kiện thống kê. Endpoint danh mục riêng là việc sau nếu cần. |
| B1.7 – Chi tiết | `/listings/{id}` + `/comparison`; 404 thật mới là không tìm thấy. Lỗi comparison chỉ làm vùng so sánh báo lỗi, vẫn đọc được nội dung tin. Xử lý metadata theo cùng chính sách. |
| B1.8 – Trường dữ liệu | Backend trả `is_demo`, web đang dùng `origin`. Dùng `is_demo` cho nhãn demo; không suy ra mọi bài thật đều đến từ extension. Bỏ/điều chỉnh bộ lọc nguồn chỉ phục vụ file local trong chế độ API. |
| B1.9 – Null và nhận định | `data_as_of`, `updated_at`, khoảng ngày có thể null. API cung cấp `message`, `disclaimer`, trạng thái và số thống kê; UI hiển thị, không tự tính median hoặc dựng nhận định khi thiếu số. |
| B1.10 – Cache và lỗi | Dữ liệu động phải cập nhật sau xử lý/duyệt; giai đoạn đầu dùng chính sách không cache cho request động. Có loading, kho rỗng, không có kết quả, lỗi/timeout và thử lại. |
| B1.11 – Xác minh | Chạy typecheck/build, test hợp đồng và smoke trình duyệt; có bằng chứng dữ liệu đến từ DB. Tài liệu cách chạy đồng bộ API/web được cập nhật. |

**Quyết định tích hợp:** dùng API thật cho luồng dữ liệu chính. Dữ liệu demo được seed vào backend vẫn là dữ liệu demo, nhưng đi qua API/DB thật. Chỉ ví dụ minh họa trên landing page được giữ ở dạng tĩnh, có nhãn rõ ràng. Gemini và màn hình đăng nhập không phải điều kiện để nối các endpoint đọc công khai.

**Tiêu chí kết thúc B1:**

- [ ] Sau seed, `/tim-tro` hiện đúng dữ liệu backend; `total`, giá, phí và trạng thái khớp response.
- [ ] Lọc nhiều phường/loại, giá/diện tích, sort và chuyển trang giữ đúng URL; danh sách trên 20 tin vẫn xem được trang tiếp theo.
- [ ] Bộ lọc giá dùng `hidden_no_price` từ API; giá không có không hiện 0.
- [ ] Mở một ID có thật từ API, bôi màu đúng tiếng Việt/emoji; ID không tồn tại cho 404.
- [ ] Comparison `insufficient_data`/`not_comparable` không vẽ số giả; API comparison lỗi không biến cả tin thành 404.
- [ ] Backend dừng hoặc timeout cho thông báo lỗi và thử lại, không hiện mock thay thế.
- [ ] Kho rỗng, ngày null và demo bật/tắt đều có trạng thái đúng; demo không lẫn vào dữ liệu thật.
- [ ] `npm run typecheck`, `npm run build` và test backend liên quan chạy thành công, hoặc lỗi có bằng chứng và được giải quyết trong phạm vi tích hợp.

Prompt thực thi riêng: [05-prompt-noi-web-api.md](05-prompt-noi-web-api.md).

### B1-UI. Chuyển ba trang hiện có theo Stitch trên nền API thật

**Phụ trách:** TV3. **Phụ thuộc:** B1 đạt kiểm tra và S0 có token/mapping. **Trạng thái:** hoàn thành trong phạm vi ba trang; 4/4 integration, 13/13 E2E, typecheck/build và live smoke đạt. [Bằng chứng/ảnh và giới hạn kiểm](08-ket-qua-s0-b1-ui-2026-10-24.md).

- [x] Chuẩn hóa `tokens.css` theo hướng đã chốt; ưu tiên CSS Modules, Be Vietnam Pro và thư viện icon/font sẵn có. Không thêm Tailwind runtime CDN để chạy bản xuất.
- [x] Chuyển header/layout và `/`, `/tim-tro`, `/tin/[id]` từng màn; giữ adapter/API contract và logic evidence/comparison đã kiểm ở B1.
- [x] Dùng bố cục/card dựa trên dữ liệu chữ/evidence khi backend không có ảnh; bỏ gallery “AI xác thực”, tên người đăng và claim an toàn của mẫu.
- [x] Giữ bộ lọc đang được API hỗ trợ; search tự do, yêu thích, basis filter mới và badge/facet không có nguồn là việc riêng.
- [x] Link, nút và số liệu có nguồn thật; ví dụ tự tạo trên landing có nhãn. Không chép `href="#"`, toast thành công hay timer giả từ HTML.
- [x] Kiểm 360/390, 768, 1440px; bảng/input không bị cắt, menu mobile, keyboard/focus, contrast, reduced motion và các trạng thái lỗi.
- [x] So ảnh tham chiếu với giao diện thật, ghi lý do những phần điều chỉnh theo nghiệp vụ; chạy lại test tích hợp có thể bị ảnh hưởng.

**Nghiệm thu:** ba trang dùng API thật và hệ visual nhất quán lấy từ Stitch; giữ đủ tiêu chí B1, không cần khớp pixel các phần mẫu sai dữ liệu. Các màn mới B2/B3/B6 dùng trực tiếp component/token đã chuẩn hóa, không dựng thêm một hệ style.

### B2. Auth, kho bài và cấu hình kết nối

**Phụ trách:** TV2 + TV3. **Phụ thuộc:** B1. **Ước lượng:** 1–2 ngày công.

- [ ] `/dang-nhap`: login/logout/me, phiên hết hạn, thông báo 401/403, redirect về trang được phép.
- [ ] Dùng khung `trang_ng_nh_p_rener_desktop_1440px`; không tạo hai trang login từ hai biến thể. Chọn vai trò demo trên mẫu không phải cơ chế cấp quyền.
- [ ] Chốt cách chuyển cookie giữa browser, Next.js server và API. Cookie `HttpOnly`, CORS có credentials khi gọi khác origin, không lưu bí mật vào biến public. Kiểm tra quyền ở API cho từng thao tác.
- [ ] `/team/kho`: trạng thái bài/job, lọc, xử lý lại, lỗi và phiên bản mới. Không hiển thị job `succeeded` như một dấu bảo đảm dữ liệu đã duyệt.
- [ ] `/team/cai-dat`: cấp/list/thu hồi token theo API có sẵn; quyền xem và thời hạn rõ ràng.
- [ ] Bổ sung điểm vào tài khoản cá nhân cho mọi người đã đăng nhập từ mẫu `t_i_kho_n_ti_n_ch_rener` (route `/tai-khoan` là đề xuất cần ghi khi triển khai). Dùng chung token panel với khu nhóm; A/B/C là ba state mặc định/tạo xong/xác nhận thu hồi. Hiện raw token một lần, ngày hết hạn theo API; không sao chép “vô thời hạn” hay IP/SSO mẫu.
- [ ] Chốt cấu hình nhóm Facebook được phép với TV4. Đặc tả có yêu cầu tải danh sách nhóm, nhưng chưa thấy endpoint tương ứng trong routes; cần thống nhất hợp đồng, quyền và nơi lưu trước khi triển khai, không tự nghĩ ra API.
- [ ] Kiểm tra export CSV/JSON và cách lưu an toàn theo quy định dữ liệu của repo.

**Nghiệm thu:** đúng người/đúng quyền, renter bị từ chối API duyệt; token thu hồi không dùng lại; bài mới và lỗi job nhìn thấy trong kho. Liên quan AT10, AT14, AT15.

### B3. Duyệt, Lab và màn hình nhận định

**Phụ trách:** TV3, TV1/TV2 hỗ trợ. **Phụ thuộc:** B2. **Ước lượng:** 2–3 ngày công.

- [ ] Lấy bố cục từ `trang_8`, `trang_9`, `trang_10` và `trang_5` trong bảng Stitch; dùng component thật thay HTML/JS giả lập. Các màn giữ nhãn/method từ API, không copy PhoBERT/checkpoint/độ tin cậy mẫu.
- [ ] `/team/duyet` và `/team/duyet/[id]`: lý do duyệt, giá trị Regex/LLM/evidence, sửa, approve/reject/split/merge theo hợp đồng hiện có.
- [ ] Gửi `expected_version`; khi 409 yêu cầu tải bản mới và đối chiếu, không ghi đè âm thầm. Duyệt xong kiểm tra listing/thống kê cập nhật.
- [ ] Sửa chênh lệch tên lý do `unit_unknown` trong prototype với `basis_unknown` của backend khi làm phần này.
- [ ] `/team/lab`: ba hàng Regex/LLM/Gold, bảng token BIO và giá trị chuẩn hóa. Đọc gold theo quyền/split, khóa nhãn test theo protocol.
- [ ] `/phan-tich/[id]`: queued/running/succeeded/failed, nhiều listing, kết quả một phần, comparison và đóng góp. Bài chưa đóng góp chỉ được xem theo quyền của chủ bài.
- [ ] Hỏi trạng thái có giới hạn/giãn cách, dừng khi xong hoặc tab ẩn, không tạo lại job khi tải lại trang.
- [ ] Nếu làm F12: form dán bài đã che SĐT dùng `/analyses`; đây cũng là đường dự phòng khi extension lỗi.

**Nghiệm thu:** AT05, AT06, AT07, AT12–AT15; các màn hình thể hiện đúng vòng đời job, listing và kết quả thống kê.

### B4. Extension hai chế độ

**Phụ trách:** TV4 + TV2. **Phụ thuộc:** hợp đồng ingest/analyses, token và nhóm được phép. **Ước lượng:** 2–4 ngày công, phụ thuộc giao diện Facebook.

- [ ] Xác minh bản extension có được phát triển ở repo/nhánh khác trước khi xây lại.
- [ ] Manifest V3, quyền tối thiểu, popup kết nối, cấu hình bộ chọn có version, bản build load unpacked.
- [ ] Thu bài khi người dùng bật và cuộn: chữ, link, ID, thời gian; mở Xem thêm một lần; che SĐT trước khi gửi.
- [ ] Hàng đợi bền qua việc service worker bị dừng, gom tối đa 20 bài/lô; idempotency và bộ đếm theo kết quả từng bài.
- [ ] Nhận định: xem trước, gửi bài, lưu analysis ID, theo dõi trạng thái, panel nhiều listing, đóng góp tự nguyện và link mở web.
- [ ] Giới hạn 50 bài/phiên, nhóm được phép, dừng khi 401/403/xác minh; retry mạng có giới hạn và không làm mất bài.
- [ ] Trang HTML mẫu kiểm bộ chọn; kiểm thực tế trên nhóm được phép khi người dùng đang đăng nhập.

**Nghiệm thu:** E1–E12 trong [đặc tả extension](../03-system/05-extension.md), kèm bản build, hướng dẫn và bằng chứng. E2 yêu cầu ít nhất 25/30 bài vào kho, bộ đếm khớp; cần kiểm thật, không thay bằng dữ liệu fixture.

### B5. Khu vực, gold và kho thị trường

**Phụ trách:** TV1 + TV4. **Bắt đầu ngay, triển khai song song với B0–B4. Ước lượng:** 2–4 ngày công tổng hợp, phụ thuộc dữ liệu nhóm đã có.

- [ ] Kiểm kê dữ liệu hiện có trên máy/nguồn riêng, số bài, chất lượng, trạng thái che SĐT và quyền sử dụng; không đưa dữ liệu thật lên git.
- [ ] Chốt 3–5 phường/khu vực và nhóm được phép; điền mã phường chính thức, địa danh/đường và ánh xạ theo tài liệu. Phường DEMO không thay cho từ điển thật.
- [ ] Pilot 15–20 bài, gán chéo và sửa guideline trước khi gán diện rộng.
- [ ] Chốt rõ số bài pilot/dev/test theo kế hoạch đánh giá: tài liệu mô tả mục tiêu xấp xỉ, cần ghi số thực tế và xác định pilot có nằm trong tổng hay không; không tự coi các số xấp xỉ là một phép chia đã khớp.
- [ ] Khóa 10 bài test phức tạp và hash, chia theo cụm phòng trước khi tune. Không đọc nhãn test để sửa prompt/regex.
- [ ] Gán tập chuẩn mục tiêu khoảng 100 bài; lưu evidence code point trên văn bản đã che; kiểm schema, span, cặp giá–diện tích và người gán.
- [ ] Thu kho thị trường mục tiêu 300–500 bài, xử lý và kiểm tay khoảng 30 listing phục vụ RQ4. Theo dõi số bài gốc, listing và cluster riêng.
- [ ] Theo dõi số tin đủ điều kiện từng nhóm. Thu thêm có mục tiêu nếu nhóm thiếu N; không hạ ngưỡng N=10 để có biểu đồ đẹp.
- [ ] Tập gold, dữ liệu DEMO và kho thật được tách theo thiết kế; công bố độ phủ và phần thiếu.

**Nghiệm thu:** có manifest dữ liệu/split, số lượng thực tế, kết quả kiểm gán nhãn, danh mục địa điểm và thống kê độ phủ nhóm.

### B6. Kiểm chứng NLP, đánh giá và đóng băng

**Phụ trách:** TV1 + TV2. **Phụ thuộc:** B5 có pilot/dev; pipeline chạy được. **Ước lượng:** 2–3 ngày công ngoài thời gian gán nhãn.

- [ ] Thử Gemini thật với mẫu dev đã che; khóa chỉ ở tiến trình worker/công cụ đánh giá, không ở web hay extension. Ghi model ID và ngày chạy.
- [ ] Kiểm quote có thật, offset, schema, timeout/retry/429, kết quả một phần và cache theo version. Không có khóa thì báo Regex-only, không ghi là đã thử LLM.
- [ ] Hiệu chỉnh phân loại, Regex, chuẩn hóa, đối chiếu và dedup trên pilot/dev. Các ca AT01–AT13 phải có bằng chứng liên quan.
- [ ] Đối chiếu script với toàn bộ chỉ số: strict/partial, chuẩn hóa, rỗng đúng, bịa giá, PRICE↔FEE, gắn phòng, dedup, chi phí/thời gian; bổ sung phần thiếu và kiểm cách tính độc lập.
- [ ] RQ1: so Regex/LLM/Hybrid trên cùng dữ liệu và bộ chuẩn hóa; Hybrid chạy LLM trên mọi bài khi đánh giá.
- [ ] RQ2: bổ sung nhánh LLM-raw chỉ cho thí nghiệm; so với LLM-grounded/Hybrid. Nhánh thí nghiệm này không được trở thành đường xử lý của sản phẩm.
- [ ] RQ3: phân loại lỗi dev, chọn ví dụ đã ẩn danh, nêu số lượng/support và giới hạn.
- [ ] RQ4: đo lệch do giá trị và do cả pipeline theo thiết kế gốc, có N từng nhóm; kiểm tay mẫu kho. Không mặc định script hiện có đã đáp ứng RQ4.
- [ ] `/team/danh-gia`: đọc `/eval/runs` và chi tiết, hiển thị phương pháp, split, version, số mẫu, số liệu thật và phần chưa chạy.
- [ ] Dùng bố cục `trang_11_nh_gi_rener` nhưng thay toàn bộ benchmark minh họa bằng manifest/metrics; không giữ F1 94,8%, 500 bài test hoặc CUDA/PhoBERT nếu run không cung cấp.
- [ ] Chốt dev, commit phiên bản pipeline, gắn `eval-freeze-v1` đúng lúc theo quy trình nhóm; chạy test một lần và giữ nguyên kết quả chính. Chạy pytest kỹ thuật không phải là chạy tập test gold.

**Nghiệm thu:** AT18, manifest/metrics/errors có thật, không lẫn dữ liệu demo; báo cáo đủ RQ1–RQ4 hoặc ghi rõ phần thiếu được nhóm chấp nhận. Không đặt trước một mức F1 chưa được đặc tả yêu cầu.

### B7. Nghiệm thu, tài liệu và gói trình bày

**Phụ trách:** cả nhóm, một người tổng hợp. **Phụ thuộc:** các gói bắt buộc ở trên. **Ước lượng:** 1–2 ngày công cùng thời gian viết báo cáo/slide.

- [ ] Bảng Thị trường tối giản từ `/market/summary` nếu làm phần này: N, nhóm so sánh, lý do loại, dữ liệu theo thời gian; không tính lại thống kê ở UI.
- [ ] Tham khảo `trang_4_th_tr_ng_rener`; bỏ “kiểm chứng thực địa”, confidence và nhóm nhà tự đặt không có trong đặc tả. Phân biệt median với trung bình và price basis với loại bài ở ghép.
- [ ] Nghiệm thu AT01–AT18 và E1–E12; mỗi ca có người kiểm, ngày, trạng thái, lệnh/ảnh/video và issue nếu chưa đạt.
- [ ] Trình duyệt desktop/mobile, bàn phím, tiếng Việt/emoji, loading/empty/error, 404/403/409/429, link điều hướng và thao tác thử lại.
- [ ] Khởi động trên máy trình bày từ hướng dẫn; kiểm đường dẫn có dấu cách, cổng, database và cách dừng tiến trình. Kiểm tra build web không vô tình phụ thuộc API đang chạy lúc build.
- [ ] Đối chiếu README gốc, README API/web/extension, `.env.example`, API contract và lệnh chạy với hành vi cuối cùng.
- [ ] Báo cáo: bài toán, dữ liệu, phương pháp, kiến trúc, thí nghiệm, lỗi, giới hạn và phân công; slide dùng cùng số liệu đã khóa.
- [ ] Diễn tập demo 8–10 phút theo tài liệu gốc, quay video dự phòng; có phương án Facebook lỗi/Gemini hết hạn mức và ghi rõ khi đang xem kết quả đã lưu.
- [ ] Kiểm diff/gói bàn giao không chứa khóa, `.env`, DB hoặc dữ liệu thật; dữ liệu được chuyển riêng theo quy định của nhóm.

**Nghiệm thu:** một thành viên khác tự chạy được theo README; mọi tiêu chí bắt buộc có bằng chứng hoặc mục chưa đạt được ghi minh bạch.

## 5. Các nguyên tắc không thay đổi khi tích hợp

- LLM chỉ tìm quote + nhãn, chuẩn hóa số bằng code; quote không có trong bài bị loại.
- Thiếu dữ liệu là null có lý do; không đổi thành 0. Không cộng phí vào giá thuê, không nhân giá/người thành giá/phòng.
- Chỉ giá tháng chính xác, cùng basis và đúng nhóm mới vào thống kê; một listing/cluster, loại cả cluster của tin đích, N < 10 báo thiếu.
- UI/extension không tự tính thống kê; trạng thái xử lý xong không đồng nghĩa listing đã đủ điều kiện công khai.
- Evidence dùng Unicode code point trên đúng văn bản lưu đã che SĐT; frontend chuyển sang chỉ số JavaScript khi cần.
- Phân quyền ở API; dữ liệu DEMO/gold/kho thật và nhãn test tuân thủ quy tắc tách biệt.

## 6. Lịch đề xuất đến hạn nộp

Hạn **01/11/2026** lấy từ [lộ trình hiện có](01-lo-trinh-va-phan-cong.md), chưa được xác nhận lại trong chat. Lịch dưới đây giả định nhóm có bốn vai trò làm song song và có thể dùng lại mã hiện có. Ước lượng ngày công của các gói là sơ bộ, có phần giao nhau; không cộng thành cam kết thời gian lịch. Một người làm toàn bộ khó đáp ứng lịch này. Stitch giảm phần thiết kế mới nhưng thêm khoảng 1,5–3 ngày công chuẩn hóa/chuyển ba màn hiện có; không mặc định có mockup là đã tiết kiệm toàn bộ thời gian frontend.

| Ngày | Trọng tâm phần mềm | Dữ liệu / đánh giá | Điều kiện qua mốc |
|---|---|---|---|
| 24/10 | Kiểm kê Stitch/S0, B0, bắt đầu B1; kiểm kê extension | Kiểm kê dữ liệu, chốt khu vực và trạng thái split | API/DB khởi động, mapping Stitch rõ |
| 25/10 | Hoàn thành luồng đọc B1; chốt token/component S0; extension khung | Pilot, gán nhãn, thu kho | Tìm trọ/chi tiết đọc API thật, lỗi không che bằng mock |
| 26/10 | B1-UI theo năng lực TV3; Auth/Kho/Token và extension tiếp tục | Khóa split trước khi tune, tiếp tục gold/kho | Bài vào DB, job có kết quả, xem được theo đúng quyền |
| 27/10 | Duyệt, Lab, nhận định theo Stitch; tiếp tục B1-UI; extension hai chế độ | Thử Gemini, tune trên dev, kiểm tay | Có luồng để sửa dữ liệu và xem nguồn NLP |
| 28/10 | Đánh giá UI, ổn định lỗi và demo | RQ1–RQ4 trên dev, rà đủ chỉ số | Đủ dữ liệu/quy trình để quyết định đóng băng |
| 29/10 | Sửa lỗi chặn nghiệm thu; hạn chế thêm tính năng | Khóa phiên bản, tag khi đủ điều kiện | Không còn sửa luật/prompt theo test |
| 30/10 | Tích hợp kết quả đánh giá, bảng Thị trường nếu kịp | Chạy test gold một lần, phân tích và lưu manifest | Có kết quả chính thức, số liệu khớp báo cáo |
| 31/10 | Nghiệm thu và diễn tập trên máy trình bày | Hoàn thiện báo cáo/slide/video | Gói bàn giao tái lập được |
| 01/11 | Kiểm cuối và nộp theo yêu cầu môn | Giữ bản đã nghiệm thu | Không thêm tính năng sát giờ |

Nếu ngày 28/10 chưa có split/dev/giao diện tối thiểu, cần nhóm quyết định điều chỉnh phạm vi hoặc lịch đánh giá. Không gắn tag cho có và không chạy test sớm để lấp kết quả.

TV3 có thể trở thành điểm nghẽn khi đồng thời chuyển ba màn và làm khu nhóm. Ưu tiên token/component chung và màn P0; hoàn thiện visual phụ sau khi luồng dữ liệu chạy, không lấy thời gian của kiểm thử/đánh giá để chép hết mọi chi tiết Stitch.

## 7. Rủi ro và điểm cần nhóm chốt

| Điểm | Tác động | Hành động |
|---|---|---|
| Chưa biết dữ liệu/extension ngoài repo | Có thể thiếu đầu vào hoặc làm trùng công | Kiểm kê ngay ở B4/B5; tận dụng bản đã có sau khi kiểm tra |
| Địa điểm thật chưa chốt | Tin không vào nhóm so sánh được | TV1/TV4 xác nhận địa bàn và mã chính thức sớm |
| OpenAPI thiếu response schema | Client sinh ra không bảo đảm kiểu | Hoàn thiện DTO ở B1, đối chiếu response và null |
| Thiếu hợp đồng danh sách nhóm cho phép | Extension và Cài đặt không tích hợp đủ | TV2/TV4 chốt hợp đồng trước khi viết chức năng này |
| Gemini chưa thử thật | Hành vi/chi phí khác test giả lập | Chạy mẫu dev sớm, giữ đường Regex và báo rõ chế độ |
| Thiếu mẫu đủ điều kiện | Không có nhận định ở nhiều nhóm | Thu có mục tiêu, công bố N; demo dùng bộ riêng có nhãn |
| Protocol số lượng gold chưa khớp rõ | Dễ báo sai số mẫu và split | Chốt bảng số lượng trước gán nhãn và tuning |
| Quá ít thời gian | P0 chưa xong nhưng đã làm nhiều trang phụ | Ưu tiên B1, luồng nhập–xử lý–duyệt, Lab, đánh giá và extension |
| Mockup có nội dung vượt khả năng backend | Dễ hiển thị số liệu/ảnh/quyền/claim sai | Dùng bảng đối chiếu Stitch; giữ layout, thay nội dung bằng dữ liệu thật, tách tính năng mới |
| DESIGN/HTML/tên thương hiệu không nhất quán | UI chắp vá hoặc đổi tên ngoài ý muốn | S0 chốt token, component và tên; giữ ReNER ở B1 |

Các câu hỏi về khu vực, dữ liệu, nguồn extension và Gemini không cản trở bắt đầu B0/B1 bằng demo. Khi gặp xung đột quy tắc nghiệp vụ phải ghi rõ tài liệu liên quan và xin quyết định; không thay luật để khớp giao diện.

## 8. Ghi nhận tiến độ và bàn giao từng gói

Mỗi gói việc dùng bản ghi ngắn sau trong issue/PR hoặc báo cáo thực thi:

```text
Gói: B1 / tên việc
Commit/branch, người phụ trách:
Trạng thái: chưa làm / đang làm / bị chặn / đã nghiệm thu
Đã thay đổi:
Lệnh kiểm tra và kết quả:
Ca AT/E/tiêu chí B1 đã chứng minh:
Bằng chứng (đường dẫn ảnh/log đã loại bí mật):
Chưa kiểm chứng / phụ thuộc còn thiếu:
Bước tiếp theo:
```

Đọc tiếp: [Prompt bắt đầu B0/B1 trong chat mới](05-prompt-noi-web-api.md), [Cách dùng Stitch và mapping từng màn](06-huong-dan-su-dung-stitch.md). Kế hoạch này không tự tạo issue, PR, lịch tự động hoặc chat mới.
