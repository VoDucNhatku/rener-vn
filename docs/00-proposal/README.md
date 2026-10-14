# Proposal và đối chiếu

Đề cương: *ReNER-VN: Trích xuất thông tin và nhận định giá thuê nhà từ bài đăng Facebook Groups bằng phương pháp lai Regex – LLM có neo nguồn.* Có hai bản 9 trang, cùng tạo ngày 07/10/2026. Hai file giữ nguyên, không sửa. Tên mentor và thành viên trong PDF còn để trống.

| Bản | File | Tạo lúc | Ghi chú |
|---|---|---|---|
| v1.2 | [proposal-ReNER-VN-v1.2.pdf](proposal-ReNER-VN-v1.2.pdf) | 07/10/2026 13:09 | Bản trước |
| v1.3 | [proposal-ReNER-VN-v1.3.pdf](proposal-ReNER-VN-v1.3.pdf) | 07/10/2026 14:05 | Bản mới nhất; repo bám theo bản này |

> **Chưa xác nhận bản nào đã nộp cho giảng viên.** Nhóm điền vào đây khi xác nhận. Nếu bản đã nộp là v1.2, các mục ở bảng dưới (cột "Chỉ có ở v1.3") được coi là phần repo bổ sung so với đề cương và nên nêu trong báo cáo cuối.

## Khác biệt giữa v1.2 và v1.3

v1.3 = v1.2 cộng thêm các bổ sung dưới đây. **Giống nhau:** tên đề tài, tóm tắt, bốn câu hỏi RQ1–RQ4, mục tiêu O1–O6, tập chuẩn ~100 bài / 10 bài test, kho 300–500 bài, kế hoạch 05/10–01/11 và phân vai TV1–TV4.

| Mục | v1.2 | Chỉ có ở v1.3 |
|---|---|---|
| 1.1 Tổng quan | LLM cho trích xuất, JSON khó, neo nguồn | Thêm trích xuất dựa trên luật (Chiticariu 2013), BiLSTM-CRF (Lample 2016), GoLLIE (2024); câu "chưa thể giả định LLM tốt hơn trên miền này". Tài liệu tham khảo tăng từ 20 lên 23 mục |
| 3 Phạm vi — Nhận định | So sánh giá chào thuê với các tin tương tự | So sánh giá **và giá/m²**; **xu hướng theo tuần** nếu đủ dữ liệu |
| 4 Pháp lý | Ẩn SĐT, không lưu tên, chỉ dùng nội bộ | Thêm: **chỉ tin người dùng đồng ý đóng góp mới vào kho**; không trích xuất thông tin liên hệ |
| Bảng 2 Rủi ro | Gộp bài trùng bằng TF-IDF + cosine | **Gộp trùng hai mức** (cùng bài, cùng phòng), chỉ gộp khi đủ căn cứ; thêm rủi ro **nhầm thay đổi thành phần dữ liệu với thay đổi giá** |
| 5.2 Thu thập | — | Mỗi bản ghi lưu liên kết, thời điểm đăng, thời điểm thu, phiên bản bộ trích xuất |
| 5.4 Vào kho | Độ tin cậy cao + đủ **giá, diện tích, vị trí** | Đồng ý đóng góp + độ tin cậy cao + đủ **giá, vị trí** (diện tích không bắt buộc) |
| 5.4 Chỉ số giá | — | Trung vị, P25–P75, giá/m²/tháng (tin thiếu diện tích không tham gia chỉ số này); kèm số phòng sau gộp trùng và độ mới |
| 5.4 Nhóm tương tự | Cùng khu vực, loại hình, khoảng diện tích | Thêm **nội thất** và **độ mới** |
| 5.4 Câu chữ | "So sánh giá chào thuê, không phải định giá" | "Giá chào thuê của mẫu đã thu, không đại diện toàn thị trường hay giá giao dịch" |
| 5.5 Đánh giá | Gán chéo 20 bài + kappa; P/R/F1, chuẩn hóa đúng, trả rỗng đúng, chi phí | Thêm **tách tập theo phòng**; thêm **độ chính xác gộp trùng**; RQ4 thêm **kiểm tay một mẫu thống kê trong kho** |
| Bảng 3 việc 9 | Bộ đối chiếu; gộp trùng; thống kê và nhận định | Gộp trùng hai mức; chỉ số giá, giá/m² và nhận định |

Bảng trên lập bằng cách trích chữ cả hai PDF và so từng dòng.

Repo đã dùng các phần chỉ có ở v1.3 sau: giá/m², xu hướng theo tuần (P1), cờ `contributed`, gộp trùng hai mức, lưu nguồn và version, tách tập theo phòng, độ chính xác gộp trùng, kiểm tay mẫu kho cho RQ4. Repo **không** dùng nội thất để chia nhóm ở bản demo; về điểm này repo gần v1.2 hơn (xem bảng cuối).

## Đề bài yêu cầu gì

Đề tài 8 của TMG301: xây bot đọc bài đăng bất động sản lộn xộn trên Facebook Groups, điền bảng chuẩn gồm **Giá, Diện tích, Vị trí, Số phòng**, trên nền **gán nhãn chuỗi** (sequence labeling) và **biểu thức chính quy** (regex) hoặc prompt LLM; trích xuất thành công từ **10 bài thực tế phức tạp**.

## Proposal cam kết gì → nằm ở đâu trong repo

| Proposal | Repo |
|---|---|
| O1 — lược đồ đầu ra, bộ nhãn BIO, hướng dẫn gán nhãn | [Từ điển dữ liệu](../02-data/01-tu-dien-du-lieu.md), [hướng dẫn gán nhãn](../02-data/02-huong-dan-gan-nhan.md), [spec/schemas](../../spec/schemas/) |
| O2 — extension Chrome hai chế độ Thu thập và Nhận định | [Đặc tả extension](../03-system/05-extension.md), [ADR-0002](../decisions/ADR-0002-extension-hai-che-do.md) |
| O3 — ba hệ trích xuất (Regex, LLM có neo nguồn, Lai) + bộ chuẩn hóa | [Pipeline](../02-data/03-pipeline-xu-ly.md), [quy tắc chuẩn hóa](../02-data/04-quy-tac-chuan-hoa.md), [ADR-0003](../decisions/ADR-0003-llm-chi-tim-span.md) |
| O4 — kho thị trường + nhận định giá theo nhóm tương tự | [Gộp trùng và thống kê](../02-data/05-gop-trung-va-thong-ke.md), [ADR-0005](../decisions/ADR-0005-nhom-so-sanh-n10.md) |
| O5 — tập chuẩn và đánh giá RQ1–RQ4 | [Kế hoạch đánh giá](../04-evaluation/01-ke-hoach-danh-gia.md) |
| O6 — web app: Trích xuất, So sánh, Bảng dữ liệu, Thị trường, Đánh giá | [Tính năng và màn hình](../01-product/03-tinh-nang-va-man-hinh.md): Chi tiết tin + Lab (trích xuất, so sánh), Kho dữ liệu (bảng), Thị trường, Đánh giá |
| Bảng 3 — kế hoạch 05/10–01/11 | [Lộ trình](../05-delivery/01-lo-trinh-va-phan-cong.md) |
| Bảng 2 — rủi ro | [Rủi ro và pháp lý](../05-delivery/03-rui-ro-va-phap-ly.md) |

## Chỗ repo cụ thể hóa hoặc điều chỉnh so với proposal v1.3

| Điểm | Proposal | Repo | Lý do |
|---|---|---|---|
| Dữ liệu extension gửi | HTML thô của bài, tách bài bằng Python ở backend; lưu HTML để Replay | Extension gửi **chữ đã che SĐT** + link + thời gian; Replay dùng trang HTML mẫu tự tạo | HTML thô chứa tên, bình luận, thuộc tính trang (dữ liệu cá nhân); chữ đã che đủ cho pipeline |
| Độ tin cậy cao/trung bình/thấp | Hai nguồn khớp → cao | Ghi `agreement` (both_agree / regex_only / llm_only / conflict), không hiển thị như xác suất | Hai phương pháp có thể cùng sai; đây là trạng thái quy trình |
| Nhóm tương tự | v1.3 gồm cả nội thất (v1.2 không có) | Chưa dùng nội thất ở bản demo | Nhiều bài không ghi nội thất |
| Giá | Giá về đồng/tháng, cờ "bao điện nước", giá theo người | Thêm `visibility`, `amount_form`, `basis`, `period` tách riêng | Phân biệt "ib giá", "từ 3tr", giá/người, giá/ngày ([ADR-0004](../decisions/ADR-0004-mo-hinh-gia.md)) |
| RQ2 | Neo nguồn có giảm bịa không | Thêm nhánh LLM không yêu cầu quote để so | Cần đối chứng mới trả lời được |
| RQ4 | So trung vị nhóm từ nhãn tay với từ hệ thống | Làm ở nhóm thô + kiểm tay mẫu kho | ~100 bài không đủ để có nhóm N ≥ 10 ở mức phường × loại × diện tích |
| Đồng thuận gán chéo | Kappa | F1 mức thực thể giữa hai người là số chính; kappa phụ | Kappa trên token bị phóng đại vì phần lớn token là `O` |

Các điều chỉnh không đổi mục tiêu, câu hỏi nghiên cứu hay phạm vi của proposal. Nên trình bày ngắn trong báo cáo cuối mục "Thay đổi so với đề cương".
