# Sử dụng bộ thiết kế Stitch cho ReNER-VN

Kiểm tra và cập nhật ngày **24/10/2026**. S0/B1-UI đã triển khai ba trang công khai `/`, `/tim-tro`, `/tin/[id]` cùng header/footer trên nền API B1. [Hệ token/component đã chốt](../DESIGN.md), [kết quả và bằng chứng kiểm](08-ket-qua-s0-b1-ui-2026-10-24.md). Các màn nhóm/auth/Lab/đánh giá/extension vẫn là giai đoạn sau.

## 1. ZIP này là gì?

Nguồn do người dùng cung cấp: `stitch_rener_rental_intelligence_platform.zip` tại gốc repo.

- Dung lượng: **10.266.147 byte**.
- SHA-256: `ADF763D54ED1E9D31085564B330F29B76A39EA7012CE26518507E731D58E6E10`.
- **17 màn/trạng thái HTML**: 12 màn chính, một bản đăng nhập thay thế, một trang tài khoản cá nhân và ba trạng thái quản lý token.
- **2 nguồn logo** mang tên `code.html`, nhưng nội dung thực tế là chuỗi base64 của SVG.
- **23 ảnh PNG** gồm ảnh chụp màn hình, logo, bản trình bày thương hiệu và hai ảnh mảnh giao diện.
- **2 Markdown**: `warm_analytical_clarity/DESIGN.md` và bảng RBAC/trạng thái.

Khi đọc tĩnh 17 HTML: không thấy lời gọi `fetch`, `XMLHttpRequest` hoặc `axios`; có 130 link `href="#"`. Một số trang có JavaScript minh họa chọn mẫu, sao chép token, checkbox hoặc toast. Đây là bản xuất thiết kế, chưa phải frontend tích hợp hay backend/extension.

Đã đọc HTML/tài liệu, tạo contact sheet của 23 ảnh; ở B1-UI xem riêng cả ba ảnh trang công khai và đối chiếu giao diện đã chuyển. HTML là tham chiếu tĩnh; responsive/tương tác được kiểm trên ứng dụng React thật, không được mặc định là đúng từ bản xuất.

## 2. Cách mở và dùng ngay trên máy

Đã giải nén phục vụ kiểm tra vào thư mục local được git ignore:

```text
F:\TMG Final Project\rener-vn-latest\.tmp\stitch-reference-2026-10-24\
  contact-sheet.png
  stitch_rener_rental_intelligence_platform\
    trang_ch_rener\code.html
    trang_ch_rener\screen.png
    ...
    warm_analytical_clarity\DESIGN.md
```

1. Mở `contact-sheet.png` để xem tổng thể; mở `screen.png` trong từng thư mục để xem rõ bố cục.
2. Đọc `code.html` bằng editor để lấy cấu trúc, khoảng cách và style. Có thể mở HTML để xem bản tĩnh, nhưng các link/nút mẫu không phải chức năng ứng dụng.
3. HTML tham chiếu Tailwind CDN, Google Fonts/Material Symbols và một số ảnh từ `lh3.googleusercontent.com`; cần mạng để bản HTML hiển thị đầy đủ. PNG dùng được khi offline.
4. Khi phát triển, tiếp tục chạy `apps/web` bằng Next.js. Chuyển từng phần thành React component và nối API, không thay web bằng việc nhúng toàn bộ HTML qua iframe hoặc `dangerouslySetInnerHTML`.

Không ghi đè nguồn ZIP. `.tmp` không phải gói bàn giao và có thể không có trên máy khác; chat triển khai phải kiểm tra và giải nén lại nếu thiếu. Khi giải nén phải kiểm tra đường dẫn entry nằm trong thư mục đích, tránh ghi đè file đã có. Chọn asset cần thiết đưa vào repo bằng một thay đổi riêng, không chép cả ZIP/ảnh mẫu vào `public/`.

## 3. Thứ tự sử dụng tài liệu

| Quyết định | Nguồn cần theo |
|---|---|
| Quy tắc giá, dữ liệu, nhãn, quyền, API | `AGENTS.md`, schema, đặc tả nghiệp vụ và code API đã đối chiếu |
| Bố cục/hệ phân cấp thị giác | `screen.png` và HTML của màn tương ứng, sau khi bỏ phần không có dữ liệu hỗ trợ |
| Màu/chữ/khoảng cách | Theo [docs/DESIGN.md](../DESIGN.md) và `tokens.css` đã chốt; tài liệu/HTML gốc của ZIP có khác biệt được giải quyết ở S0 |
| State và menu theo vai trò | Bảng RBAC trong ZIP là checklist; quyền thực tế lấy từ API và tài liệu gốc |
| Nội dung/số liệu động | Response API, trạng thái worker, run đánh giá thật; không lấy số trong ảnh |

Giữ tên dự án **ReNER-VN/ReNER** trong bước tích hợp. ZIP có cả TrọCheck và ReNER AI Lab, chưa phải quyết định đổi tên. Logo và thương hiệu cuối cùng cần được chốt trước khi thay đồng loạt header/title/metadata; việc này không chặn nối API.

## 4. Bản đồ màn hình sang repo

Tên thư mục dưới đây nằm trong `stitch_rener_rental_intelligence_platform/` của ZIP.

| Thư mục thiết kế | Route/component mục tiêu | Gói việc và cách dùng |
|---|---|---|
| `trang_ch_rener` | `/`, hero và phần giới thiệu | B1 nối stats; B1-UI chuyển bố cục. Ví dụ NER phải ghi là minh họa. Form phân tích là F12, không tự thêm vào B1. |
| `trang_2_t_m_tr_rener` | `/tim-tro`, bộ lọc, listing card, pagination | B1 nối API; B1-UI chuyển bố cục. Dùng thẻ dựa trên chữ/evidence khi chưa có dữ liệu ảnh. |
| `trang_3_chi_ti_t_ph_ng_rener` | `/tin/[id]`, evidence, rent/fees, comparison | Giữ highlight và dữ liệu thật; bỏ gallery/AI xác thực/đánh dấu an toàn không có nguồn. |
| `trang_4_th_tr_ng_rener` | `/thi-truong` | B7/P1: bảng từ market summary, đúng loại nhà/basis/N. Biểu đồ chi tiết chỉ thêm khi có dữ liệu/API phù hợp. |
| `trang_5_ph_n_t_ch_b_i_ng_rener` | Form phân tích và `/phan-tich/[id]` | B3: tách form nhập F12 với trang kết quả J1; trạng thái lấy từ analyses, không chạy timer giả. Route form mới cần ghi trong bản đồ route khi triển khai. |
| `trang_ng_nh_p_rener_desktop_1440px` | `/dang-nhap` | B2: ưu tiên bản đơn giản này làm khung. Gửi username/password tới API. |
| `trang_6_ng_nh_p_rener` | Tham khảo biến thể đăng nhập | Không tạo route thứ hai. Các ô chọn vai trò demo chỉ có thể giúp điền tài khoản thử; không được cấp quyền ở frontend. |
| `t_i_kho_n_ti_n_ch_rener` | Khu tài khoản/token cho mọi người đã đăng nhập | B2: dùng component token chung. Đề xuất route `/tai-khoan` khi triển khai; đây là route web mới, không phải endpoint API có sẵn. |
| `trang_7_kho_d_li_u_rener` | `/team/kho` | B2: bảng bài, filter, job và reprocess theo API. Bỏ các KPI/crawler control chưa có API. |
| `trang_8_h_ng_duy_t_rener` | `/team/duyet` | B3: hàng duyệt/lý do. Không bật duyệt hàng loạt trước khi có thiết kế giao dịch/xung đột tương ứng. |
| `trang_9_duy_t_m_t_tin_rener` | `/team/duyet/[id]` | B3: nội dung gốc và đối chiếu/sửa hai cột; submit `expected_version`, 409 và thao tác split/merge đúng contract. |
| `trang_10_lab_rener` | `/team/lab` | B3: bố cục so phương pháp và BIO; thay PhoBERT thành Regex/LLM/Gold phù hợp response; khóa test. |
| `trang_11_nh_gi_rener` | `/team/danh-gia` | B6: bố cục báo cáo; số liệu/version/split từ eval runs, không copy 94,8% hoặc 500 bài test. |
| `trang_12_c_i_t_h_th_ng_rener` | `/team/cai-dat` | B2: menu theo quyền; dùng token/account component chung, cấu hình nhóm chờ hợp đồng. |
| `c_i_t_rener_frame_a_m_c_nh` | Token panel: trạng thái mặc định | Một component dùng chung ở tài khoản/khu nhóm, không một route riêng. |
| `c_i_t_rener_frame_b_v_a_t_o_m_th_nh_c_ng` | Token panel: vừa tạo | Hiện token đầy đủ một lần từ POST; copy thật, sau đó không đọc lại token từ GET. |
| `c_i_t_rener_frame_c_x_c_nh_n_thu_h_i` | Token panel: xác nhận thu hồi | Dialog xác nhận, pending/error/success và cập nhật list; dữ liệu thiết bị/IP trên mẫu không tự có. |

Hai thư mục `logo_rener_ai_lab_m_i`, `logo_trocheck_th_m_nh_gi_ph_ng_tr` chứa SVG base64. Đã xác nhận decode ra `<svg>`; khi chọn dùng cần kiểm tra/sanitize rồi lưu `.svg` hoặc chuyển sang component. Không đưa chuỗi base64 như text lên trang. Hai ảnh `image.png_1/2` là mảnh tham khảo, không dùng làm giao diện chạy thật.

## 5. Nội dung cần sửa trước khi đưa vào sản phẩm

| Nội dung trong Stitch | Khác với repo | Cách xử lý |
|---|---|---|
| PhoBERT-NER, CRF, PyTorch/CUDA, checkpoint | Pipeline hiện là Regex + Gemini + đối chiếu; huấn luyện riêng ngoài phạm vi đồ án | Giữ bố cục, đổi tên phương pháp theo response/config thật; không bổ sung mô hình mới chỉ để khớp ảnh. |
| F1 94,8%, 1.248 tin, 500 bài test, 0,42 giây | Là số minh họa trong HTML | Chỉ hiện số từ API/manifest; chưa đo thì ghi chưa có dữ liệu. |
| Ảnh phòng, avatar người đăng, “Ảnh thực tế AI xác thực” | Đặc tả extension không thu ảnh/tên người đăng; chưa có mô hình xác thực ảnh | Không dùng ảnh stock như ảnh của listing; thay gallery bằng nội dung có bằng chứng, bỏ tuyên bố xác thực. |
| “An toàn”, “bẫy giá”, thẩm định tuyệt đối | Hệ thống chỉ so giá chào thuê, không phát hiện lừa đảo | Đổi sang nhận định trung tính từ API và giới hạn dữ liệu. |
| “Đắt hơn do full nội thất” | Chưa có mô hình giải thích nguyên nhân chênh lệch | Không gán quan hệ nhân quả; chỉ hiển thị chênh lệch được API trả. |
| “Giá TB”, ngưỡng cosine >0,85, phân khúc diện tích tùy mẫu | Luật gốc dùng median, ngưỡng và nhóm theo cấu hình/đặc tả | Dùng thuật ngữ, nhóm và ngưỡng thật; không sửa backend để khớp con số trên ảnh. |
| Ở ghép là loại phòng, gác xép/CCMN cao cấp như enum riêng | `roommate` là loại bài không phục vụ luồng cho thuê; loại nhà có enum cố định | `per_person` là cơ sở giá của tin cho thuê, không đồng nghĩa bài tìm người ở ghép. Chỉ dùng property_type có trong schema. |
| Search tự do, yêu thích, facet count, lọc basis ở danh sách | API listings hiện chưa hỗ trợ đầy đủ các thao tác này | B1 dùng bộ lọc hiện có. Đưa chức năng thêm vào P1/hợp đồng riêng; không lọc cục bộ một trang để giả hỗ trợ. |
| Tên/IP/email người vận hành, SSO, đồng bộ realtime | Auth hiện trả user_id/username/roles; chưa có telemetry/SSO | Render đúng trường hiện có, bỏ dữ liệu giả. |
| Token “vô thời hạn”, token prefix có sẵn trong GET | Backend có expires_at, mặc định 30 ngày; GET không trả raw token/prefix | Hiện ngày hết hạn thật. POST hiện raw token một lần; danh sách dùng name/id và trạng thái suy từ các mốc thời gian. |
| Nút chọn role, Researcher thấy mọi menu | Quyền là tập `roles` API trả; collector/reviewer/researcher khác nhau | Menu và thao tác theo role thực tế; API kiểm lại. Tạo token không nâng quyền. |
| SĐT còn che một phần, thông báo “SĐT trùng khớp” | Dữ liệu lưu phải che bằng `[SĐT]`; dedup không dựa vào SĐT thô | Hiển thị văn bản đã che từ API, bỏ bằng chứng trùng SĐT không tồn tại. |
| Tải PDF, thay model, chạy lại batch, log thiết bị | Chưa có endpoint tương ứng cho mọi thao tác trên mẫu | Lập backlog riêng khi cần; không để nút giả báo thành công. |

Bảng RBAC trong ZIP hữu ích ở chỗ phân biệt sáu trục: tiến trình, LLM, review, đóng góp, độ đầy đủ văn bản và điều kiện thống kê. Khi triển khai chỉ hiển thị trục nào response có dữ liệu; không suy đoán trạng thái còn thiếu. Nhãn “renter chỉ đọc” trên một frame chưa mô tả hết quyền phân tích/đóng góp/quản lý token cá nhân.

## 6. Chuẩn hóa thiết kế và component

### 6.1. Màu/chữ cần một nguồn thống nhất

`DESIGN.md` tự mâu thuẫn: frontmatter dùng nền `#f9f9ff`, primary `#005243`; phần diễn giải dùng `#FAFAF7`, primary `#146C5A`. Góc bo cũng có nhiều cách gọi. HTML/ảnh chủ yếu theo nền sáng hơi xanh, điểm nhấn xanh lục đậm. CSS hiện tại của web lại dùng nền `#f6f4ee`, accent `#2337c6` và thêm Newsreader/JetBrains Mono.

S0 đã chọn nền `#f9f9ff`, primary `#005243`, hover/focus `#146c5a`, Be Vietnam Pro và bộ màu NER có chữ nhãn. Bỏ palette prototype và diễn giải nền ngà, chuẩn hóa bo panel 12px/control 8px. Chi tiết và hợp đồng component tương lai ở [docs/DESIGN.md](../DESIGN.md).

Không coi lời khẳng định WCAG AAA trong tài liệu xuất là kết quả kiểm tra. B1-UI đã đo text hiển thị trên ba trang ở bốn bề rộng, kiểm nhãn/badge/focus và lưu báo cáo; phạm vi kiểm được ghi trong bàn giao, chưa phải chứng nhận WCAG toàn bộ.

### 6.2. Thành phần dùng chung đề xuất

- `PublicHeader`/`TeamShell`: menu, active route, phiên và điều hướng theo vai trò.
- `Button`, `Field`, `Alert`, `Dialog`, `Table`, `Pagination`: hành vi/focus/loading chung, tránh chép style từng trang.
- `ListingCard`, `RentDisplay`, `FeeList`, `EvidenceHighlighter`, `ComparisonPanel`: tái sử dụng logic dữ liệu hiện có, thay trình bày dần.
- `StatusBadge`: tách loại trạng thái; không một màu “thành công” cho mọi thứ.
- `ExtensionTokenPanel`: tài khoản cá nhân và khu nhóm dùng cùng logic; A/B/C là state của panel.
- `EmptyState`, `ErrorState`, skeleton: thiết kế với dữ liệu thật, không chỉ happy path trên screenshot.

Giữ CSS Modules và package font/icon sẵn có nếu đáp ứng thiết kế; không cần thêm Tailwind runtime CDN để dùng bản xuất. Nếu nhóm muốn đổi hệ CSS, tách thành quyết định và gói việc riêng.

### 6.3. Mobile và tương tác phải bổ sung

Mẫu hướng desktop, PNG có nhiều kích thước chụp và một số chỗ chữ bị cắt. PNG không chứng minh trang đã responsive. Khi chuyển sang React:

- Kiểm các bề rộng 360/390, 768 và 1440px; sidebar thành drawer, filter thành panel, nội dung hai cột xếp dọc.
- Bảng rộng có cuộn hoặc cách xem từng hàng hợp lý; input chỉnh giá không bị co còn vài ký tự như ảnh Duyệt tin.
- Evidence dùng được bằng click/focus, không chỉ hover; giữ Unicode code point và văn bản gốc.
- Dialog có nhãn, focus trap/return focus, Escape và disabled trong lúc submit khi phù hợp.
- Loading/rỗng/error/401/403/409/429/timeout phải có màn/trạng thái; các thao tác nguy cơ mất dữ liệu có xác nhận đúng nghiệp vụ.
- Hoạt ảnh tôn trọng giảm chuyển động, không che nội dung chờ hiệu ứng.

## 7. Thứ tự triển khai với kế hoạch hiện có

1. **S0 – đã chốt:** mapping, nội dung cần bỏ/sửa, token và component specification ở tài liệu Design. Public component đã chạy; shell nhóm/form/table/dialog/token panel mới dừng ở specification.
2. **B0/B1 – đã có bàn giao:** [kết quả môi trường/API](07-ket-qua-b0-b1-2026-10-24.md), giữ làm nền tích hợp.
3. **B1-UI – đã triển khai:** token/header/footer và ba trang công khai; kiểm hồi quy và ảnh tại [bàn giao UI](08-ket-qua-s0-b1-ui-2026-10-24.md).
4. **B2/B3/B6 – các màn mới:** triển khai thẳng theo blueprint đã chuẩn hóa cho auth, account/token, Kho, Duyệt, Lab, kết quả phân tích và Đánh giá; không thiết kế lại từ đầu.
5. **B7 – hoàn thiện:** bảng Thị trường nếu kịp, visual QA, mobile, dữ liệu thật và diễn tập.

S0/B1-UI không phải lý do trì hoãn thu dữ liệu, làm extension hay đánh giá. Nếu sát hạn, ưu tiên giao diện nhất quán ở thành phần dùng chung và các luồng P0; không cắt nghiệm thu để khớp từng pixel của mockup.

## 8. Checklist bàn giao B1-UI (ba trang công khai)

- [x] Ba màn có route, nguồn dữ liệu/API public read, state và bằng chứng kiểm.
- [x] Không có ID/số liệu/model giả từ ZIP trong luồng thật; minh họa tĩnh có nhãn.
- [x] Không có ảnh phòng gán sai nguồn, tên/IP/SSO/độ chính xác bịa hoặc claim xác thực.
- [x] Một bộ token, tên ReNER-VN/ReNER nhất quán, icon Lucide có sẵn; không render SVG base64 như chữ.
- [x] Link/button trong phạm vi hoạt động; không còn `href="#"` để thay route.
- [x] Typecheck/build, 4/4 integration và 13/13 E2E đạt; kiểm 360/390/768/1440px, bàn phím, contrast, reduced motion, lỗi.
- [ ] B2: Token A/B/C chạy với API, quyền đúng và hạn dùng đúng (ngoài B1-UI).

Liên quan: [Kế hoạch hoàn thiện](04-ke-hoach-hoan-thien-2026-10-24.md), [Prompt B0/B1](05-prompt-noi-web-api.md), [Bối cảnh sản phẩm](../PRODUCT.md).
