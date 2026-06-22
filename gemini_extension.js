class GeminiExtension {
    getInfo() {
        return {
            id: 'geminiAI',
            name: 'Trợ Lý Gemini',
            color1: '#00B0FF', // Màu nền khối lệnh (Xanh dương)
            color2: '#0081CB', // Màu viền
            blocks: [
                {
                    opcode: 'askGemini',
                    blockType: 'reporter', // Khối lệnh hình bo tròn để lấy dữ liệu
                    text: 'Hỏi Gemini: [QUESTION]',
                    arguments: {
                        QUESTION: {
                            type: 'string',
                            defaultValue: 'Vỏ hộp sữa bỏ thùng nào?'
                        }
                    }
                }
            ]
        };
    }

    askGemini(args) {
        // THẦY NHỚ DÁN LẠI API KEY CỦA THẦY VÀO DÒNG BÊN DƯỚI NHÉ
        const apiKey = 'AIzaSyCerz1wXOPIjn54XEhc4kUB63IQji9SUJ8'; 
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
        
        const payload = {
            contents: [{ parts: [{ text: "Đóng vai chuyên gia môi trường trả lời thật ngắn gọn: " + args.QUESTION }] }]
        };

        // Lệnh gọi HTTP Request trong Scratch 3
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.candidates && data.candidates[0]) {
                return data.candidates[0].content.parts[0].text;
            }
            return "Lỗi phản hồi từ máy chủ AI.";
        })
        .catch(error => {
            return "Lỗi kết nối mạng, vui lòng kiểm tra lại.";
        });
    }
}

// Đăng ký khối lệnh với hệ thống Scratch 3
Scratch.extensions.register(new GeminiExtension());