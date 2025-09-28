## Chương 4 · Dân chủ XHCN & Nhà nước pháp quyền — Trang thuyết trình (one‑page)

Trang web (tiếng Việt) dạng trang đơn cuộn với hero nền video, các section neo (scroll spy), quiz nhanh và chatbot nổi.

### Chạy dự án

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```powershell
npm install
npm run dev
```

Build sản phẩm:

```powershell
npm run build
npm run preview
```

Nếu bạn gặp cảnh báo về phiên bản Node khi build, hãy nâng cấp Node trên Windows:

- Dùng winget (đơn giản):
	```powershell
	winget install OpenJS.NodeJS.LTS
	```
- Hoặc dùng nvm-windows để quản lý nhiều phiên bản:
	```powershell
	winget install CoreyButler.NVMforWindows
	nvm install 22.12.0
	nvm use 22.12.0
	node -v
	```

### Tính năng chính
- Header bám dính với highlight mục đang cuộn (Tuyên ngôn độc lập, Hành trình, Dân chủ XHCN, Nhà nước pháp quyền XHCN, Phát huy & Xây dựng, Quiz, Thông điệp, Tính minh bạch AI, Q&A).
- Hero nền video cờ (file `/public/flag-bg.mp4`) + overlay + ngôi sao ánh sáng.
- Section timeline (Hành trình) + các mục nội dung cô đọng và danh sách nhiệm vụ.
- Quiz nhanh (dễ mở rộng thêm câu hỏi).
- Chatbot nổi (FAB) + phần Q&A tóm tắt – hỗ trợ API ngoài hoặc fallback retrieval nội bộ.
- Modal thành viên (nút NHÓM 4).
- Hiệu ứng reveal-on-scroll, dark maroon theme + điểm nhấn vàng.
- Cấu trúc dễ in: chỉ in nội dung (có thể bổ sung style in nếu cần).

### Video nền `/flag-bg.mp4`
Đặt video (1–3MB, h264) vào thư mục `public/` tên `flag-bg.mp4`. Nếu không có, hero dùng gradient tĩnh.

Gợi ý nén bằng ffmpeg:
```powershell
ffmpeg -i input.mp4 -vf "scale=1280:-1,fps=30" -c:v libx264 -preset veryfast -b:v 1500k -an flag-bg.mp4
```

### Chatbot dùng API (tùy chọn)
- Đặt biến môi trường `VITE_CHAT_API_URL` trỏ tới endpoint POST trả JSON `{ answer: string }` hoặc `{ message: string }`.
- Tạo file `.env.local` hoặc tham khảo `.env.example`:

```powershell
echo VITE_CHAT_API_URL=https://your-chat-endpoint.example.com > .env.local
```

Nếu không đặt, chatbot sẽ trả lời bằng tri thức cục bộ trong trang.

- Khi có `VITE_CHAT_API_URL`: bot có thể trả lời mọi câu hỏi tổng quát (đa lĩnh vực). Với câu hỏi đúng nội dung bài học, bot được nhắc bám sát mục II, III.1, III.2, III.3.
- Khi không có API: bot trả lời theo phạm vi kiến thức đã biên soạn trong trang (retrieval QA ngắn gọn, gạch đầu dòng).

Contract API (frontend → backend):

Request

```json
{
	"messages": [
		{ "role": "system", "content": "..." },
		{ "role": "user", "content": "Câu hỏi?" },
		{ "role": "bot", "content": "Trả lời trước đó..." }
	]
}
```

Response (một trong hai)

```json
{ "answer": "Nội dung trả lời" }
```

hoặc

```json
{ "message": "Nội dung trả lời" }
```

Chạy API demo cục bộ (tùy chọn)

```powershell
npm run api:demo
```

Đặt biến môi trường để frontend dùng API demo:

```powershell
echo VITE_CHAT_API_URL=http://localhost:8787/chat > .env.local
```

Thử gọi API demo bằng curl:

```powershell
curl -X POST http://localhost:8787/chat -H "Content-Type: application/json" -d '{"messages":[{"role":"user","content":"dân chủ XHCN là gì"}]}'
```

### Gợi ý thuyết trình
- Mở hero nêu chủ đề & mục tiêu.
- Hành trình (timeline) nhấn mốc 1945 → 1986 → 2013 → hiện nay.
- Dân chủ XHCN → Nhà nước pháp quyền XHCN → Phát huy & Xây dựng (nhiệm vụ).
- Quiz tương tác.
- Thông điệp & Tính minh bạch AI.
- Q&A trực tiếp với chatbot.

Chèn ảnh minh họa:
Đặt ảnh vào `public/` rồi thay `div.image-slot` bằng:
```jsx
<div className="media image-slot">
  <img src="/dan-chu.jpg" alt="Minh họa dân chủ XHCN" />
</div>
```

### Tham chiếu
- Hiến pháp nước CHXHCN Việt Nam năm 2013.
- Văn kiện Đại hội XIII của Đảng.
- Các nghị quyết về xây dựng Nhà nước pháp quyền XHCN, phòng chống tham nhũng.
