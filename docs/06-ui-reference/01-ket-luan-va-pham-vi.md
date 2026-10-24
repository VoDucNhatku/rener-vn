# ReNER — kết luận đã đính chính và bộ tham chiếu giao diện

Ngày tổng hợp: 24/10/2026. Phạm vi: ảnh, prompt yêu cầu do người dùng cung cấp, bộ HTML xuất và source local của ReNER. Đây là bản ghi nhận hiện trạng, không phải phê duyệt thiết kế hoặc thay đổi nghiệp vụ.

## 1. Kết luận thay thế các đề xuất trước

**Chưa có căn cứ yêu cầu tạo thêm một trang web độc lập ở thời điểm này.** Bộ tham chiếu ban đầu đã có 11 màn chính. Trang Cài đặt đã được tạo ở lượt bổ sung và được xem qua ảnh; không được đổi tên thành “Tài khoản & Tiện ích” rồi tính là một trang còn thiếu nữa.

- Giữ các màn sản phẩm gốc và hero cuộn local.
- Rút yêu cầu tạo lại Đăng nhập: màn này đã có trong bộ gốc.
- Rút yêu cầu tạo thêm trang Tài khoản & Tiện ích trùng chức năng Cài đặt.
- Rút yêu cầu tạo frame tài liệu quyền/ma trận trạng thái trên canvas sản phẩm.
- Không coi mọi biến thể loading/lỗi/thành công là một trang mới.
- Không dùng các prompt bổ sung cũ như đặc tả đã được duyệt.
- Bốn ảnh xuất lỗi cần được xuất lại, không đồng nghĩa bốn màn đó chưa được thiết kế.

Không kết luận toàn bộ giao diện đã đầy đủ hoặc sẵn sàng triển khai chỉ từ bản xuất: bốn màn chưa có ảnh hợp lệ để đánh giá thị giác; tương tác của bản xuất chưa được chạy kiểm chứng.

Người dùng đã nói sẽ bỏ các kết quả bổ sung bị lệch. Bản ghi này không xác nhận việc xóa/khôi phục đã thực sự diễn ra trên công cụ thiết kế. Các ảnh bổ sung trong chat không có file HTML trong gói xuất đã nhận.

## 2. Các quyết định và ràng buộc đã được người dùng nêu

| Nội dung | Phạm vi hiện tại |
|---|---|
| Thiết bị | Chỉ website desktop 1440 px; không yêu cầu mobile/tablet |
| Thương hiệu | ReNER; cách đặt tên tài liệu/thư mục bàn giao dùng ReNER UI Reference |
| Mở đầu trang chủ | Giữ trải nghiệm hero cuộn của web local |
| Công việc đã yêu cầu | Đọc, phân tích, tổng hợp và lưu bộ tham chiếu lên repo |
| Không tự triển khai | Không nhập HTML vào app, không sửa UI đang chạy hoặc đổi phân quyền |

Các tên/nhãn khác có trong file xuất gốc được giữ như bằng chứng tham chiếu, không phải quyết định đổi thương hiệu hay thay thế tên ReNER.

## 3. Danh mục bộ tham chiếu đã nhận

1. Trang chủ.
2. Tìm trọ.
3. Chi tiết phòng.
4. Thị trường.
5. Phân tích bài đăng.
6. Đăng nhập.
7. Kho dữ liệu.
8. Hàng duyệt.
9. Duyệt một tin.
10. Lab.
11. Đánh giá.

Gói xuất có **13 HTML**: 11 màn trên và 2 bản logo; **17 file tên PNG** và 1 DESIGN.md. Có 4 file PNG chứa chuỗi báo lỗi tải ảnh, nên chỉ 13 PNG có ảnh hợp lệ. Không dựng ảnh thay thế hoặc sửa nội dung HTML để che lỗi xuất.

Trang Cài đặt bổ sung và frame tài liệu quyền chỉ được xem qua ảnh chat; không tự tạo HTML thay thế cho chúng trong gói này.

## 4. Điều cần giữ và điều cần rà trong thiết kế

### 4.1 Hero local

Giữ một hero theo cuộn: **Bài gốc → Gán nhãn → Chuẩn hóa → So sánh**. Bài đăng di chuyển/thu nhỏ, nền nhãn quét, bảng chuẩn hóa vào và bảng nhận định xuất hiện theo tiến trình cuộn. Đây là chuyển động giải thích sản phẩm, không phải tiến trình xử lý AI thật.

Không yêu cầu dựng lại hero thành bốn section hoặc thêm một hero tĩnh thứ hai. Khi tích hợp sau này, số liệu, tiêu chí nhóm và nhãn nhận định phải khớp dữ liệu backend; giữ chuyển động không có nghĩa đóng cứng các số mock hiện tại. Giảm chuyển động vẫn cần được hỗ trợ trên desktop.

### 4.2 Ngôn ngữ thị giác

Tham chiếu gốc dùng nền ngà, thẻ trắng, xanh đậm, Be Vietnam Pro và năm màu NER có chữ đi kèm. Hero local có serif, bút dạ quang và hình thức tờ giấy. Hai bộ chưa được coi là một hệ token đã thống nhất; không tự thay mã nguồn chỉ để ép khớp.

Các điểm cần rà: nhãn/màu nhất quán giữa trang; khoảng cách và phân cấp; mức độ lặp card/badge; chữ thật có ích cho người thuê. Không xem việc đổi font/màu là đủ để làm giao diện bớt mẫu AI.

### 4.3 Nội dung chưa có căn cứ

Các số như lượng tin, điểm chất lượng, latency, F1 và số người dùng trong mock không phải kết quả đã đo. Những nội dung như model/checkpoint tự thêm, đánh giá sao, xác thực ảnh, khảo sát thực địa và lời hứa an toàn phải được đối chiếu nguồn hoặc bỏ khi triển khai. Không biến “dữ liệu đã duyệt” thành “phòng đã được xác minh”.

## 5. Tài khoản và quyền — đính chính cách giải thích

**Đăng nhập bằng username/password; role gắn với tài khoản và do backend đọc.** Không cần ô chọn role. Tên tài khoản không tự quyết định quyền. Các thẻ tài khoản demo có thể chỉ giúp điền tài khoản đã được cấp, không cấp quyền mới.

Web có hai khu trình bày: người tìm trọ và khu làm việc của nhóm. Backend hiện khai báo năm vai trò: renter, collector, reviewer, researcher, admin; một tài khoản có thể mang nhiều role.

| Role | Các chức năng chính trong source hiện tại |
|---|---|
| renter | Nhận định bài; đóng góp bài được phép truy cập; token cá nhân |
| collector | Thu theo lô, xem kho; các chức năng tài khoản chung |
| reviewer | Xem kho, xử lý lại, duyệt/loại và xử lý cluster trùng |
| researcher | Lab, đọc đánh giá, xuất dữ liệu chuẩn hóa |
| admin | Vượt kiểm tra role của các chức năng đã triển khai; không tự tạo ra chức năng chưa có |

Khách có thể đọc tin công khai và thị trường. Mọi tài khoản đăng nhập được tạo token của chính mình; chỉ collector/admin được thu theo lô. Role không tự kế thừa nhau, ngoại trừ cách admin vượt kiểm role. Seed reviewer có thêm collector là cấu hình tài khoản demo, không phải quy tắc kế thừa.

Có thể dùng admin và renter cho một buổi demo, nhưng chưa có quyết định chuyển backend thành đúng hai role. Việc đó không thuộc bản bàn giao này.

## 6. Các ranh giới nghiệp vụ phải được giữ khi dựng UI

- Xử lý xong khác duyệt; duyệt khác đóng góp; hiển thị khác đủ điều kiện thống kê.
- Bài nhận định mặc định chưa đóng góp. Chưa công khai không có nghĩa chỉ chủ bài xem được: một số role nội bộ có quyền truy cập theo code.
- Bài nguồn, phiên bản bài, lần trích xuất, tin/phòng và cluster trùng là các đối tượng khác nhau.
- Giá/người và giá/phòng không trộn; thiếu thông tin không thay bằng 0; giá từ/khoảng không thành giá exact.
- Giá thuê tách khỏi phí; không tự ước lượng tổng chi tiêu.
- Nhóm so sánh bỏ cluster của tin đích và chỉ lấy một đại diện đủ điều kiện mỗi cluster.
- Ngưỡng hiện tại: tối thiểu 10 mẫu, cửa sổ 30 ngày, near từ -10% đến +10%. Ví dụ 5,2 triệu so 5,6 triệu là **Gần trung vị (-7,1%)**, không phải badge thấp hơn theo ngưỡng này.
- P25–P75 là độ phân tán mẫu, không phải vùng giá an toàn hoặc khoảng tin cậy.
- `split` trong service duyệt hiện tách listing khỏi cluster; chưa phải tạo nhiều phòng từ một listing.
- Gold nghiên cứu khác bản sửa của người duyệt. Admin không tự bỏ khóa gold test trong service.

## 7. Những phần còn phải kiểm, không được tự tính thành màn mới

| Phần | Cần làm rõ hoặc kiểm tra |
|---|---|
| Bốn ảnh lỗi | Xuất lại ảnh Tìm trọ, Hàng duyệt, Duyệt một tin, Đánh giá |
| Cài đặt hiện có | Rà quyền và dữ liệu cá nhân/token; không sinh trang trùng |
| Trạng thái | Loading, rỗng, lỗi, thiếu giá/đơn vị/vị trí, nguồn chưa đủ chữ, partial, thiếu mẫu, xung đột duyệt |
| Token | One-time plaintext, hạn dùng, thu hồi; last_used không phải online; danh sách không trả mã gốc |
| Tìm trọ | `basis` filter chưa có trên route hiện tại; cần bổ sung contract trước khi nối lọc ngân sách theo đơn vị |
| Nhiều phòng/ảnh | Cần hợp đồng đọc siblings; pipeline ảnh chưa có trong schema ingest hiện tại |
| Lab/Đánh giá | Lab dùng LLM đã lưu; đánh giá đọc artifact; chưa có nghĩa bấm UI là chạy test/AI mới |
| Extension | Bộ popup/panel nếu chưa được thiết kế là phần tham chiếu riêng; không phải thêm trang web hoặc mobile |

Các khoảng trống về API không chứng minh phải tạo thêm trang. Có thể cần thay trường, thông báo, hộp thoại hoặc hành vi trong màn đã có. Chưa chốt thêm bookmark, quản trị tài khoản, nguồn, gallery hoặc nút chạy nghiên cứu mới.

## 8. Trạng thái triển khai đã quan sát trước đó

Web localhost từng được mở và thử: trang chủ, Tìm trọ, chi tiết; lọc Cầu Giấy 12→5 và sort tăng giá hoạt động trên dữ liệu mẫu. Lúc kiểm, các liên kết Thị trường/Kho/Hàng duyệt/Lab trả 404. Đây là quan sát tại thời điểm kiểm, không phải health check hiện thời.

Source web dùng mock/file mẫu local, chưa gọi API thật ở lớp client đã đọc. Backend có pipeline/worker và route. Collector riêng hiện xuất JSON. Chưa chứng minh luồng Facebook → API → NLP → web hoạt động end-to-end. HTML tham chiếu không được nhập vào app trong lần bàn giao này.

## 9. Phạm vi lưu trên repo và kiểm chứng

- Lưu đủ file HTML, ảnh kể cả ảnh lỗi, DESIGN.md, ZIP đóng gói lại và manifest.
- Tên thư mục/gói bàn giao chuẩn hóa thành ReNER UI Reference; nội dung các file xuất được giữ nguyên byte.
- Đây là tài sản tham chiếu có chứa dữ liệu minh họa và chi tiết chưa duyệt, không phải bản giao diện sẵn sàng phát hành.
- Các prompt bổ sung trước không được phát hành như bản đặc tả chính thức.
- Kiểm tính toàn vẹn gói và các liên kết nội bộ của tài liệu bổ sung; không coi đó là kiểm thử app, an toàn tuyệt đối hoặc kiểm toàn bộ asset từ bên ngoài.

## 10. Nguồn đối chiếu code/tài liệu

Tính từ gốc repo:

- `docs/03-system/03-api-contract.md`: authentication/role/route.
- `apps/api/app/services/users.py`, `api/routes.py`, `services/seed.py`: role, token, guard và tài khoản mẫu.
- `services/analyses.py`, `listings.py`, `reviews.py`: quyền đối tượng, hiển thị, duyệt và split cluster.
- `pipeline/market.py`, `core/config.py`, `docs/02-data/05-gop-trung-va-thong-ke.md`: nhóm so sánh và ngưỡng.
- `services/lab.py`, `eval/run_eval.py`, `apps/api/README.md`: khả năng và giới hạn Lab/đánh giá.
- Prompt yêu cầu và ảnh người dùng cung cấp; bộ xuất trong `design-references/`.

Không thay đổi nguồn sự thật về dữ liệu hoặc quyết định đã ghi trong repo. Mục đích bản tổng hợp là rút các kết luận thiết kế sai và lưu tài liệu để đối chiếu trước khi triển khai tiếp.
