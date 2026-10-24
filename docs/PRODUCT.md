# Product

Tóm tắt bối cảnh từ đặc tả hiện có để đọc bộ thiết kế Stitch và lập kế hoạch. Tài liệu này không thay thế quy tắc dữ liệu/API trong `AGENTS.md`.

## Register

product

## Users

- Sinh viên tìm trọ: tìm tin theo ngân sách, đọc đúng giá/phí và kiểm tra đoạn nguồn.
- Collector: thu bài và theo dõi xử lý.
- Reviewer: sửa kết quả, duyệt và gộp trùng.
- Researcher: so Regex/LLM/Gold, đánh giá và phân tích lỗi.
- Giảng viên: kiểm chứng phương pháp và kết quả của đồ án.

## Product Purpose

ReNER-VN trích xuất thông tin thuê trọ từ bài đăng tiếng Việt, giải thích bằng evidence và so với trung vị các tin tương tự khi đủ dữ liệu. Demo chạy local; sản phẩm không khẳng định giá giao dịch hay tình trạng còn phòng.

## Brand Personality

Rõ ràng, có căn cứ, thực dụng. Hình ảnh tham khảo từ gói Stitch do người dùng cung cấp; ưu tiên công việc đọc tin và kiểm dữ liệu. Bộ thiết kế chưa phải bằng chứng chức năng đã triển khai.

## Anti-references

Tránh trình bày như sàn đăng bán với ảnh phòng chưa có nguồn, hứa hẹn chính xác tuyệt đối, hoặc dùng huy hiệu hoàn tất để gộp mọi trạng thái xử lý/duyệt/so sánh. Tránh coi dữ liệu mẫu là kết quả thực nghiệm.

## Design Principles

- Cho người dùng kiểm lại đoạn chữ làm bằng chứng.
- Phân biệt thiếu dữ liệu với giá trị bằng 0.
- Tách giá thuê, phí, cơ sở giá và trạng thái đủ điều kiện so sánh.
- Hiển thị đúng dữ liệu, quyền và trạng thái mà API cung cấp.
- Dùng thành phần chung cho khu người thuê và khu nhóm khi có cùng hành vi.

## Accessibility & Inclusion

Theo đặc tả web: desktop/mobile, thao tác bàn phím, tương phản WCAG AA, trạng thái loading/rỗng/lỗi/thành công. Giữ tiếng Việt và emoji đúng vị trí evidence; không chỉ dùng màu để biểu đạt nhãn hoặc trạng thái. Kiểm giảm chuyển động khi triển khai animation.

Nguồn: [Tầm nhìn](01-product/01-tam-nhin-va-nguoi-dung.md), [Màn hình](01-product/03-tinh-nang-va-man-hinh.md), [Kế hoạch hiện tại](05-delivery/04-ke-hoach-hoan-thien-2026-10-24.md).
