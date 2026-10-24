# ReNER UI Reference — 24/10/2026

Bộ tham chiếu do người dùng cung cấp, được giữ tách khỏi mã ứng dụng. Không phải bản UI đã được duyệt hoặc đã tích hợp backend.

Đọc [kết luận đã đính chính](../../docs/06-ui-reference/01-ket-luan-va-pham-vi.md) trước khi dùng.

## Mở bản HTML

Tải [rener-ui-export-2026-10-24.zip](rener-ui-export-2026-10-24.zip), giải nén và mở `code.html` trong thư mục màn tương ứng. GitHub hiển thị source HTML, không chạy các trang như ứng dụng. HTML có thể tải font, thư viện hoặc ảnh từ bên ngoài; chưa kiểm offline hay khả năng hoạt động của các nguồn này.

## Các màn đã có

| Màn | HTML | Ảnh xuất |
|---|---|---|
| Trang chủ | [HTML](export/rener_rental_intelligence_platform/trang_ch_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_ch_rener/screen.png) |
| Tìm trọ | [HTML](export/rener_rental_intelligence_platform/trang_2_t_m_tr_rener/code.html) | Ảnh xuất lỗi — cần xuất lại |
| Chi tiết phòng | [HTML](export/rener_rental_intelligence_platform/trang_3_chi_ti_t_ph_ng_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_3_chi_ti_t_ph_ng_rener/screen.png) |
| Thị trường | [HTML](export/rener_rental_intelligence_platform/trang_4_th_tr_ng_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_4_th_tr_ng_rener/screen.png) |
| Phân tích bài đăng | [HTML](export/rener_rental_intelligence_platform/trang_5_ph_n_t_ch_b_i_ng_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_5_ph_n_t_ch_b_i_ng_rener/screen.png) |
| Đăng nhập | [HTML](export/rener_rental_intelligence_platform/trang_6_ng_nh_p_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_6_ng_nh_p_rener/screen.png) |
| Kho dữ liệu | [HTML](export/rener_rental_intelligence_platform/trang_7_kho_d_li_u_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_7_kho_d_li_u_rener/screen.png) |
| Hàng duyệt | [HTML](export/rener_rental_intelligence_platform/trang_8_h_ng_duy_t_rener/code.html) | Ảnh xuất lỗi — cần xuất lại |
| Duyệt một tin | [HTML](export/rener_rental_intelligence_platform/trang_9_duy_t_m_t_tin_rener/code.html) | Ảnh xuất lỗi — cần xuất lại |
| Lab | [HTML](export/rener_rental_intelligence_platform/trang_10_lab_rener/code.html) | [PNG](export/rener_rental_intelligence_platform/trang_10_lab_rener/screen.png) |
| Đánh giá | [HTML](export/rener_rental_intelligence_platform/trang_11_nh_gi_rener/code.html) | Ảnh xuất lỗi — cần xuất lại |

## Phạm vi và giới hạn

- 13 HTML (11 màn chính, 2 logo), 17 file tên PNG (13 ảnh hợp lệ, 4 báo lỗi tải ảnh) và 1 DESIGN.md.
- Có thêm các phương án logo/ảnh trong thư mục export; giữ để truy lại bản xuất, không coi là quyết định đổi tên sản phẩm.
- Trang Cài đặt bổ sung chỉ có ảnh trong hội thoại, chưa có HTML trong gói đã nhận. Không tạo HTML thay thế.
- Giữ nguyên nội dung mẫu, model/metric và tên còn lệch trong file gốc để đối chiếu. Những nội dung đó chưa được duyệt để đưa vào sản phẩm.
- Đóng gói lại chỉ đổi tên ZIP và thư mục gốc; các file xuất giữ nguyên byte. [Manifest](manifest.json) ghi SHA-256 nguồn, gói mới và từng file.
- Không thay đổi `apps/`, schema, quyền hoặc luật dữ liệu. Không đưa các prompt bổ sung đã rút lại vào làm đặc tả chính thức.
