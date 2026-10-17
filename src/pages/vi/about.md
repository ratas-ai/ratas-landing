---
layout: ../../layouts/Layout.astro
title: Giới thiệu Ratas
description: Ratas là gì và vì sao tồn tại.
---

# Giới thiệu Ratas

**Ratas** là nền tảng AI agent. Agent của bạn xây dựng, triển khai, vận hành và
quản trị những ứng dụng và quy trình mà doanh nghiệp của bạn cần — sống ngay
trong workspace của bạn và tự hoàn thành công việc, dưới sự quản lý của bạn.

## Về cái tên

**Ratas** là tên gọi tắt của **Ratatoskr** — chú sóc trong thần thoại Bắc Âu,
ngày ngày chạy ngược xuôi dọc Yggdrasil, cây thế giới, mang tin giữa đại bàng
trên ngọn cây và con rồng dưới gốc rễ.

Đó đúng là những gì một agent nên là: nhanh nhẹn, bền bỉ và luôn chuyển động —
mang ý định của bạn đi khắp mọi tầng của hệ thống và đưa thông điệp đến đúng nơi
cần đến. Chú sóc và cái cây bạn thấy xuyên suốt trang này chính là lời nhắc về
câu chuyện ấy.

## Bốn chú hươu

Cũng trong thần thoại ấy, bốn chú hươu rong ruổi trên cành Yggdrasil — **Dáinn,
Dvalinn, Duneyrr và Duraþrór**. Ratas cũng có bốn primitive cốt lõi của riêng
mình — những khối cơ bản mà mọi agent làm việc cùng, xếp lớp từ đơn vị nhỏ nhất
đến quy trình hoàn chỉnh. Mỗi lớp lắp ghép từ lớp bên dưới.

### Snippet

**Snippet** là một đơn vị code — JavaScript, Python, SQL, Bash... Nó có input
được định kiểu và một giá trị trả về duy nhất, và **không có side effect**: cùng
một input luôn cho cùng một kết quả, không gì khác. Nhờ vậy snippet có tính
**xác định (deterministic)** và an toàn để tái sử dụng.

Rata agent sinh ra snippet khi bạn mô tả tác vụ. Sau khi bạn chạy thử, xem kết
quả và đồng ý, đoạn code đó được đóng băng thành một **version bất biến
(immutable)**. Một snippet tích lũy nhiều version theo thời gian, nên
**rollback** chỉ là đổi con trỏ — không phải lục lại lịch sử trò chuyện để khôi
phục logic cũ. Snippet là **đơn vị nhỏ nhất**: Widget, Gadget và Workflow không
nhúng code trực tiếp — chúng **tham chiếu tới một version snippet được ghim
(pinned)**.

### Widget

**Widget** là một thành phần UI độc lập do Rata tạo ra và nhúng trực tiếp vào
view của app — ví dụ _Weather Today_, _to-do list_, _lịch sử hành động của
agent_, hay _Quick Actions_. Logic và dữ liệu của widget dựa trên các snippet.
Widget cũng có version như snippet, nhưng app chỉ bind vào đúng **một version
đang hoạt động** tại một thời điểm — những gì người dùng thấy luôn là một bản
build đã được ghim, xác định.

### Gadget

**Gadget** là một ứng dụng web hoàn chỉnh — CRM, HR, PIM, dashboard... — được lắp
ghép theo yêu cầu của bạn. Nó kết hợp snippet (logic) và widget (UI) thành một
app triển khai được, có URL riêng. Mỗi gadget chạy trong **ranh giới cô lập
(isolation boundary)**: có dữ liệu riêng, và việc truy cập chéo giữa các gadget
là tường minh, có kiểm soát — không ngầm định.

Bạn có thể chia sẻ URL của gadget cho người dùng, phân quyền cho họ, và **audit
mọi hành động** họ thực hiện. Rata cũng có thể vận hành gadget thay bạn — điều
khiển các tác vụ trong đó giống như cách nó trigger snippet — nên agent là một
tác nhân hạng nhất bên trong app, không chỉ là người tạo ra nó.

### Workflow

**Workflow** điều phối một chuỗi bước để hoàn thành một tác vụ — tương tự n8n hay
Dify, nhưng khác biệt ở một điểm then chốt: **bạn không phải kéo-thả các node
trên canvas hay cần bất kỳ hiểu biết kỹ thuật nào. Bạn chỉ mô tả cho Rata, và nó
dựng ra workflow.** Bên dưới, nó vẫn hỗ trợ đầy đủ các primitive điều khiển luồng
cốt lõi: rẽ nhánh **tuần tự và có điều kiện**, **xử lý lỗi kèm retry**, **vòng
phản hồi (feedback loop)**, **cổng phê duyệt** và đầu vào có người tham gia
(human-in-the-loop), cùng **quản lý trạng thái bền bỉ (durable state)** — một lần
chạy có thể tạm dừng rồi khôi phục mà không mất vị trí.

> Đặt hàng → Kiểm tra tồn kho → _(hết hàng → báo phản hồi cho người mua)_ →
> Sếp phê duyệt _(human-in-the-loop)_ → Tạo hóa đơn & giao vận.

Một bước trong workflow có thể gọi một version snippet đã ghim, đọc dữ liệu của
gadget, gửi email, hay nhắn Slack/Telegram — lắp ghép các primitive nhỏ hơn
thành một quy trình đầu-cuối.

### Agentic Workflow

Điểm đặc biệt riêng của Rata: **agentic workflow** là một workflow trong đó một
hoặc nhiều bước do chính agent thực thi, thay vì chạy theo logic viết cứng sẵn —
nên những bước cần "nhìn" và phán đoán (đọc, bóc tách, kiểm chứng) được Rata xử
lý ngay trong luồng. Ví dụ, biến một tấm ảnh hóa đơn thành một bản ghi đã được
kiểm chứng:

```text
[Người dùng gửi ảnh hóa đơn]
        │
        ▼
🐿️ Rata đọc hóa đơn ──(ảnh mờ / không đọc được)──► [Báo người dùng chụp lại]
        │
        ▼ (thành công)
🐿️ Rata bóc tách thông tin
        │
        ▼
🐿️ Rata kiểm tra thông tin ◄──(thiếu / sai)── [Quay lại xử lý]
        │
        ▼ (hợp lệ)
[Lưu vào hệ thống]
        ▼
[Hoàn tất — báo cáo kết quả]
```

Các bước đánh dấu 🐿️ là nơi **Rata tham gia trực tiếp** — đọc, bóc tách và phán
đoán — còn các bước còn lại chạy như những bước tự động thông thường.

## Vì sao chọn Ratas

#### Không chỉ dựng sẵn, mà đồng hành vận hành

Agent của bạn không dừng lại ở việc tạo ra ứng dụng rồi bỏ ngỏ. Nó ở lại, túc
trực và tự động xử lý các công việc lặt vặt hằng ngày để bạn thảnh thơi tập trung
vào việc lớn.

#### Chỉ cần nói điều bạn muốn

Quên đi rào cản code lách, cấu hình kỹ thuật hay thao tác kéo-thả phức tạp. Bạn
chỉ cần mô tả mong muốn bằng ngôn ngữ tự nhiên, Ratas sẽ lo trọn phần còn lại.

#### Thoải mái thử nghiệm, không sợ rủi ro

Dễ dàng thay đổi và hoàn tác chỉ với một cú nhấp chuột. Mọi thứ luôn nằm trong
tầm kiểm soát để bạn tự tin chia sẻ thành quả với đội nhóm hay khách hàng.

#### Bắt đầu miễn phí, phát triển dài lâu

Trải nghiệm hoàn toàn miễn phí cho các dự án cá nhân, chỉ nâng cấp khi thực sự
cần mở rộng quy mô. Bạn có thể tự tin kiểm chứng giá trị trước khi đầu tư bất kỳ
chi phí nào.

## Dành cho ai

Dành cho các cá nhân và đội nhóm muốn tự động hóa việc **xây dựng và vận hành**
phần mềm — hoàn toàn không cần thuê lập trình viên, quản lý máy chủ hay mất thời
gian học các công cụ phức tạp.

Khởi đầu trọn vẹn với dự án cá nhân miễn phí, và mượt mà mở rộng sang workspace
chung khi đội ngũ của bạn sẵn sàng.

<!-- DRAFT: rà soát và bổ sung trước khi launch. -->
