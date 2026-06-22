(function(ext) {
    // Dọn dẹp bộ nhớ khi Scratch dừng
    ext._shutdown = function() {};
    
    // Kiểm tra trạng thái Extension (màu xanh là OK)
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };
    
    // Hàm thực hiện gọi API Gemini
    ext.askGemini = function(question, callback) {
        const apiKey = 'AIzaSyCerz1wXOPIjn54XEhc4kUB63IQji9SUJ8'; // <--- ĐIỀN API KEY VÀO ĐÂY
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
        
        const data = {
            contents: [{ parts: [{ text: "Hãy đóng vai một chuyên gia môi trường, trả lời ngắn gọn: " + question }] }]
        };
        
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            // Lấy text trả về
            if(data.candidates && data.candidates[0]) {
                callback(data.candidates[0].content.parts[0].text);
            } else {
                callback("Mình đang lỗi mạng, bạn hỏi lại nhé!");
            }
        })
        .catch(error => {
            callback("Xin lỗi, kết nối API thất bại.");
        });
    };

    // Khai báo hình dáng khối lệnh trong Scratch
    var descriptor = {
        blocks: [
            // R: Khối lượng Reporter (hình oval), gọi hàm askGemini, tham số %s (string)
            ['R', 'Hỏi Gemini: %s', 'askGemini', 'Vỏ sữa bỏ thùng nào?'],
        ]
    };
    
    // Đăng ký Extension với hệ thống Scratch
    ScratchExtensions.register('Trợ Lý Gemini', descriptor, ext);
})({});