# apps/web — Next.js

**Trạng thái:** chưa code. Phụ trách chính: TV3.

## Cần xây

| Phần | Đặc tả |
|---|---|
| Màn hình, trạng thái, nội dung | [Tính năng và màn hình](../../docs/01-product/03-tinh-nang-va-man-hinh.md) |
| Người dùng đi qua những bước nào | [Hành trình J1–J5](../../docs/01-product/02-hanh-trinh-nguoi-dung.md) |
| Dữ liệu lấy từ đâu | [API contract](../../docs/03-system/03-api-contract.md) |
| Ý nghĩa từng trường | [Từ điển dữ liệu](../../docs/02-data/01-tu-dien-du-lieu.md) |

## Cấu trúc dự kiến

```text
apps/web/src/
  app/
    (renter)/          page.tsx (/), tim-tro/, tin/[id]/, thi-truong/, phan-tich/[id]/
    (team)/team/       kho/, duyet/, duyet/[id]/, lab/, danh-gia/, cai-dat/
    dang-nhap/
  features/
    listings/          thẻ tin, bộ lọc (state trên URL)
    listing-detail/    vùng giá/phí, bôi màu nhãn, nhóm so sánh
    market/
    review/
    lab/               3 hàng bôi màu Regex/LLM/Gold, bảng BIO
    eval/
  components/          ui dùng chung: Badge, Table, EmptyState, ErrorState, PriceDistributionBar, EvidenceHighlighter
  lib/api/             client sinh từ OpenAPI của FastAPI — không sửa tay
  styles/tokens.css    màu, chữ, khoảng cách
```

## Thành phần quan trọng nhất

**`EvidenceHighlighter`**: nhận `text` và danh sách `evidence {start, end, label}` (vị trí code point), đổi sang chỉ số UTF-16 của JavaScript, bôi màu và **ghi chữ nhãn** cạnh mỗi đoạn. Bấm một trường ở bảng giá/phí thì đoạn tương ứng sáng lên. Test bằng [spec/fixtures](../../spec/fixtures/README.md), gồm một ca có emoji.

**`PriceDistributionBar`**: thanh P25–trung vị–P75 với chấm "tin này"; khi `status ≠ ok` thì không vẽ số, chỉ hiện lý do.

## Nguyên tắc

- Không tự tính trung vị hay điều kiện so sánh ở frontend; chỉ hiển thị dữ liệu API trả.
- Bộ lọc nằm trên URL; đổi kiểu hiển thị giữ bộ lọc.
- Mỗi màn có đủ trạng thái đang tải / rỗng / lỗi / thành công; dùng được bằng bàn phím; hiển thị được trên điện thoại; tương phản đạt WCAG AA.
- Vai trò người dùng chỉ quyết định hiển thị menu; quyền thật do API kiểm.
- Trước khi coi là xong: chụp màn hình từng trạng thái và xem lại.
