---
layout: ../../layouts/Layout.astro
title: AI có trách nhiệm — Ratas
description: Cách Ratas tiếp cận AI agent an toàn, minh bạch và có trách nhiệm.
---

# AI có trách nhiệm

Ratas vận hành AI Agent hành động thay bạn — xây dựng, triển khai và vận hành
phần mềm, gọi công cụ, viết và chạy code. Điều này mạnh hơn một chatbot rất
nhiều, và cũng hệ trọng hơn nhiều, nên trách nhiệm được đặt ngay trong cách nền
tảng hoạt động. Cách tiếp cận của chúng tôi bám theo những khung hướng dẫn được
công nhận rộng rãi như [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
và Các nguyên tắc AI của OECD, điều chỉnh cho những agent thực sự hành động.

## Con người giám sát & kiểm soát

Bạn luôn ở trong vòng kiểm soát. Agent đề xuất và hành động, nhưng bạn nắm quyền
điều khiển.

- **Duyệt cho các hành động tác động lớn.** Triển khai, xóa dữ liệu, chi tiêu,
  gửi tin nhắn thay bạn, hay thay đổi quyền truy cập đều được đưa ra cho bạn
  duyệt thay vì chạy âm thầm.
- **Khả năng hoàn tác.** Khi một hành động có thể đảo ngược, bạn có thể hoàn tác.
  Snippet và widget đều có version, nên bạn luôn quay về được trạng thái tốt đã
  biết.
- **Có thể ngắt.** Bạn có thể tạm dừng, dừng hẳn hoặc can thiệp vào agent bất cứ
  lúc nào.
- **Tự chủ trong phạm vi.** Bạn quyết định agent được tự làm đến đâu; mức tự chủ
  cao là tùy chọn bật thêm, không phải mặc định.

## Minh bạch & khả diễn giải

- Agent lưu lại **dấu vết có thể kiểm soát** về các bước thực hiện, công cụ đã
  gọi và dữ liệu đã chạm tới.
- Chúng tôi nói rõ điều gì được tự động hóa và điều gì cần bạn xác nhận.
- Nội dung do agent tạo ra có thể nhận biết được.
- Khi agent thực hiện một hành động không hiển nhiên, nó giải thích lý do và dữ
  liệu đầu vào phía sau để bạn tự đánh giá có nên tin hay không.

## An toàn & hành lang bảo vệ

- **Mặc định tối thiểu quyền hạn.** Agent hoạt động trong phạm vi, quyền và ranh
  giới cô lập đã định — chỉ chạm tới công cụ và dữ liệu bạn cấp.
- **Xác nhận cho thao tác hủy.** Hành động không thể đảo ngược cần được duyệt
  rõ ràng.
- **Thực thi trong sandbox.** Code mà agent viết ra chạy trong môi trường bị
  ràng buộc, cô lập.
- **Ranh giới nội dung.** Chúng tôi từ chối các yêu cầu tạo điều kiện cho gây
  hại, lạm dụng, mã độc hay vi phạm pháp luật, và đặc biệt thận trọng với các
  lĩnh vực nhạy cảm.

## Bảo mật & Ổn định

Hệ thống agentic mang những rủi ro mà một mô hình đơn thuần không có. Chúng tôi
thiết kế để phòng ngừa:

- **Prompt injection & lạm dụng công cụ.** Nội dung không đáng tin (trang web,
  tệp, kết quả từ công cụ) được coi là dữ liệu, không phải chỉ thị có thể chiếm
  quyền điều khiển agent.
- **Bảo vệ thông tin xác thực.** Bí mật và thông tin xác thực của connector được
  giới hạn phạm vi, lưu trữ an toàn và không bao giờ in lại dưới dạng rõ.
- **Giới hạn bán kính ảnh hưởng.** Quyền hạn, giới hạn tần suất và sự cô lập
  khoanh vùng hậu quả của một sai sót hay một bước bị xâm phạm.

## Độ tin cậy & giới hạn

AI Agent có thể mắc lỗi, hiểu sai ý định hoặc tạo ra kết quả sai hay lỗi thời.
**Ratas là công cụ, không phải người ra quyết định.** Hãy rà soát kết quả của
agent trước khi dựa vào nó cho bất cứ việc hệ trọng nào — đặc biệt là các vấn đề
pháp lý, tài chính, y tế hay an toàn. Chúng tôi nỗ lực để hành vi nhất quán và
dự đoán được, nhưng không bảo đảm tính đúng đắn, và bạn nên giữ sự kiểm tra của
con người với những kết quả quan trọng.

## Công bằng & thiên kiến

Các mô hình mà Ratas dựa trên có thể phản ánh thiên kiến có sẵn trong dữ liệu
huấn luyện của chúng. Chúng tôi hướng tới giảm các kết quả bất công hay gây hại,
tránh xây dựng các tính năng phân biệt đối xử dựa trên các đặc điểm được bảo vệ,
và khuyến khích bạn rà soát logic do agent tạo ra có ảnh hưởng đến con người
(tuyển dụng, cho vay, phân quyền truy cập và tương tự) trước khi đưa vào vận
hành.

## Quyền riêng tư & dữ liệu

- Dữ liệu của bạn được dùng để **vận hành agent của bạn** — không dùng để huấn
  luyện mô hình công cộng dùng chung nếu chưa có sự đồng ý của bạn.
- Ratas được xây trên Cloudflare, nơi Workers AI cam kết **không huấn luyện trên
  nội dung của bạn** và **không lưu giữ dữ liệu (zero data retention)** cho suy
  luận tiêu chuẩn. Xem
  [Workers AI data usage](https://developers.cloudflare.com/workers-ai/platform/data-usage/)
  của Cloudflare.
- Khi phát triển, chúng tôi có thể chạy model qua các nhà cung cấp khác tuân thủ
  cùng tiêu chuẩn — ví dụ AWS Bedrock, với cam kết không lưu giữ dữ liệu (zero
  data retention) và không huấn luyện trên dữ liệu của bạn. Xem
  [Bedrock security, privacy & responsible AI](https://aws.amazon.com/bedrock/security-privacy-responsible-ai/)
  của AWS.
- Chúng tôi chỉ thu thập mức **tối thiểu** cần thiết để cung cấp dịch vụ. Xem
  [Chính sách bảo mật](/vi/privacy) để biết chi tiết.
- Bạn kiểm soát dữ liệu của mình và có thể xuất hoặc xóa.

## Trách nhiệm chung

Sử dụng có trách nhiệm là sự hợp tác hai phía:

- **Bạn** chịu trách nhiệm về cách mình sử dụng agent, các quyền mình cấp và các
  hành động mình cho phép — cũng như việc rà soát kết quả trước khi dựa vào nó.
- **Chúng tôi** chịu trách nhiệm xây dựng các hành lang bảo vệ, cơ chế kiểm soát,
  sự cô lập và minh bạch để việc sử dụng có trách nhiệm trở nên khả thi, và trung
  thực về những gì nền tảng làm được và không làm được.

## Báo cáo vấn đề

Phát hiện lạm dụng, vấn đề an toàn hay bảo mật, hoặc hành vi bất thường? Hãy cho
chúng tôi biết — chúng tôi xem trọng các báo cáo và sẽ không gây bất lợi cho
việc báo cáo thiện chí: **admin@ratas.ai**

<!-- DRAFT: rà soát cùng luật sư và bổ sung trước khi launch. -->
