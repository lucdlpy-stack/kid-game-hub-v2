import { Game } from '../types/game';

export const DEFAULT_GAMES: Game[] = [
  // === DÒNG GAME 1: KỸ NĂNG SỐNG & AN TOÀN CHO BÉ (NHẬN BIẾT XE CỨU HỘ, HỎA HOẠN, NGƯỜI XẤU) ===

  // 1. GAME KỸ NĂNG: HỎA HOẠN
  {
    id: 'game_an_toan_hoa_hoan',
    title: 'Bé Học Kỹ Năng Khi Gặp Hỏa Hoạn',
    icon: '🧯',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé học cách lấy khăn ướt bịt mũi, bò khom lưng tránh khói và gọi chú lính cứu hỏa 114 khẩn cấp!',
    badgeTheme: 'rose',
    bannerImage: '/src/assets/images/kid_archery_fun_1794371559510.jpg',
    interactiveQuestions: [
      {
        question: 'Khi thấy nhà có khói đen hoặc đám lửa, bé cần dùng cái gì bịt lên mũi miệng?',
        options: ['Chiếc Khăn Ướt Mát', 'Bàn Tay Khô', 'Tờ Sách Giấy'],
        optionEmojis: ['🧼', '✋', '📖'],
        correctAnswer: 'Chiếc Khăn Ướt Mát',
        timeLimit: 20,
        hint: 'Khăn ướt giúp lọc bớt khói độc cho bé thở an toàn!',
        soundType: 'bell',
        emoji: '🧯'
      },
      {
        question: 'Khi di chuyển thoát khỏi phòng có nhiều khói lửa, bé phải đi như thế nào?',
        options: ['Bò Thấp Khom Lưng', 'Đứng Thẳng Chạy', 'Nhảy Tung Tăng'],
        optionEmojis: ['🙇', '🚶', '🏃'],
        correctAnswer: 'Bò Thấp Khom Lưng',
        timeLimit: 20,
        hint: 'Khói độc luôn bay lên cao, bò thấp giúp bé thở không khí sạch ở dưới!',
        soundType: 'bell',
        emoji: '🔥'
      },
      {
        question: 'Số điện thoại khẩn cấp gọi Các Chú Lính Cứu Hỏa đến dập lửa là số mấy?',
        options: ['Số 114 Cứu Hỏa', 'Số 113 Cảnh Sát', 'Số 115 Cấp Cứu'],
        optionEmojis: ['🚒', '🚓', '🚑'],
        correctAnswer: 'Số 114 Cứu Hỏa',
        timeLimit: 20,
        hint: 'Một Một Bốn là số gọi các chú lính cứu hỏa dũng cảm!',
        soundType: 'car',
        emoji: '📞'
      },
      {
        question: 'Khi chạy ra ngoài an toàn, bé có nên quay lại lấy đồ chơi trong nhà lửa không?',
        options: ['Không Quay Lại Nhà', 'Quay Lại Lấy Gấu Bông', 'Đi Tìm Đồ Chơi'],
        optionEmojis: ['🛑', '🧸', '🔍'],
        correctAnswer: 'Không Quay Lại Nhà',
        timeLimit: 20,
        hint: 'An toàn tính mạng của bé là quan trọng nhất!',
        soundType: 'bell',
        emoji: '🏠'
      },
      {
        question: 'Chú lính cứu hỏa dũng cảm dùng dụng cụ nào để dập tắt đám lửa?',
        options: ['Bình Cứu Hỏa & Vòi Nước', 'Cây Cọ Vẽ Tranh', 'Chiếc Quạt Giấy'],
        optionEmojis: ['🧯', '🖌️', '🪭'],
        correctAnswer: 'Bình Cứu Hỏa & Vòi Nước',
        timeLimit: 20,
        hint: 'Vòi nước phun mạnh giúp dập tắt lửa nhanh chóng!',
        soundType: 'car',
        emoji: '🚒'
      },
      {
        question: 'Xe cứu hỏa chở nước đi chữa cháy thường có màu sắc gì rực rỡ?',
        options: ['Màu Đỏ Tươi', 'Màu Đen Tuyền', 'Màu Xanh Biển'],
        optionEmojis: ['🚒', '⬛', '🌊'],
        correctAnswer: 'Màu Đỏ Tươi',
        timeLimit: 20,
        hint: 'Xe màu đỏ tươi có còi hụ vang xin đường cứu hỏa!',
        soundType: 'car',
        emoji: '🚨'
      },
      {
        question: 'Khi di chuyển qua gầm cầu thang hay lối thoát hiểm, bé nhìn theo bảng hiệu có chữ gì?',
        options: ['Bảng EXIT Lối Ra', 'Bảng Cấm Đi', 'Bảng Dừng Lại'],
        optionEmojis: ['🏃‍♂️', '🚫', '🛑'],
        correctAnswer: 'Bảng EXIT Lối Ra',
        timeLimit: 20,
        hint: 'Bảng màu xanh lá cây chỉ hướng thoát hiểm an toàn!',
        soundType: 'bell',
        emoji: '🚪'
      },
      {
        question: 'Khi bị kẹt trong phòng có khói, bé có nên chui vào gầm giường hay tủ áo trốn không?',
        options: ['Không Được Trốn Gầm Giường', 'Trốn Trong Tủ Áo', 'Chui Xuống Thảm'],
        optionEmojis: ['🙅‍♂️', '🚪', '🛏️'],
        correctAnswer: 'Không Được Trốn Gầm Giường',
        timeLimit: 20,
        hint: 'Bé cần đứng gần cửa sổ hoặc ban công vẫy tay gọi chú cứu hỏa thấy!',
        soundType: 'bell',
        emoji: '🛏️'
      },
      {
        question: 'Dụng cụ chữa cháy cầm tay có bình xịt khí nén dập lửa gọi là gì?',
        options: ['Bình Cứu Hỏa', 'Bình Nước Uống', 'Bóng Thổi'],
        optionEmojis: ['🧯', '🍼', '🎈'],
        correctAnswer: 'Bình Cứu Hỏa',
        timeLimit: 20,
        hint: 'Bình xịt dập tắt đám lửa khẩn cấp!',
        soundType: 'bell',
        emoji: '🧯'
      },
      {
        question: 'Khi ra ngoài ban công kêu cứu hỏa, bé nên vẫy vật dụng gì rực rỡ?',
        options: ['Áo Hoặc Khăn Sáng Màu', 'Tờ Giấy Đen', 'Đôi Dép'],
        optionEmojis: ['👕', '⬛', '👟'],
        correctAnswer: 'Áo Hoặc Khăn Sáng Màu',
        timeLimit: 20,
        hint: 'Vẫy áo sáng màu để các chú cứu hỏa phát hiện vị trí bé nhanh nhất!',
        soundType: 'bell',
        emoji: '🚩'
      }
    ]
  },

  // 2. GAME KỸ NĂNG: PHÒNG NGỪA NGƯỜI XẤU
  {
    id: 'game_phong_nguai_nguoi_xau',
    title: 'Bé Tự Bảo Vệ Trước Người Lạ',
    icon: '🚫',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé không nhận kẹo từ người lạ, hô to nhờ người xung quanh giúp đỡ và luôn nắm tay bố mẹ!',
    badgeTheme: 'amber',
    interactiveQuestions: [
      {
        question: 'Nếu một người lạ không quen biết cho bé kẹo bánh ngon, bé nên làm gì?',
        options: ['Không Nhận Kẹo Lạ', 'Cầm Ngay Ăn Luôn', 'Đi Theo Người Lạ'],
        optionEmojis: ['🙅', '🍬', '🚶'],
        correctAnswer: 'Không Nhận Kẹo Lạ',
        timeLimit: 20,
        hint: 'Bé ngoan chỉ nhận kẹo khi có sự đồng ý của Bố Mẹ và Cô Giáo!',
        soundType: 'bell',
        emoji: '🍭'
      },
      {
        question: 'Khi đi siêu thị hay công viên đông người, bé phải làm gì để không bị lạc?',
        options: ['Nắm Chặt Tay Bố Mẹ', 'Tự Chạy Đi Chơi', 'Đi Theo Bạn Lạ'],
        optionEmojis: ['👨‍👩‍👧', '🏃', '🚸'],
        correctAnswer: 'Nắm Chặt Tay Bố Mẹ',
        timeLimit: 20,
        hint: 'Luôn đi bên cạnh Bố Mẹ giúp bé luôn an toàn tuyệt đối!',
        soundType: 'bell',
        emoji: '🤝'
      },
      {
        question: 'Nếu người lạ cố tình nắm tay kéo bé đi, bé phải phản ứng thế nào?',
        options: ['Hô Thật To Cứu Với', 'Im Lặng Đi Theo', 'Mỉm Cười Cùng Đi'],
        optionEmojis: ['🗣️', '🤫', '😊'],
        correctAnswer: 'Hô Thật To Cứu Với',
        timeLimit: 20,
        hint: 'Hô to "Cứu cháu với! Cháu không biết người này!" để mọi người xung quanh giúp đỡ!',
        soundType: 'bell',
        emoji: '📣'
      },
      {
        question: 'Số điện thoại khẩn cấp gọi Các Chú Cảnh Sát bảo vệ an ninh là số mấy?',
        options: ['Số 113 Cảnh Sát', 'Số 114 Cứu Hỏa', 'Số 115 Cấp Cứu'],
        optionEmojis: ['🚓', '🚒', '🚑'],
        correctAnswer: 'Số 113 Cảnh Sát',
        timeLimit: 20,
        hint: 'Một Một Ba là số gọi chú cảnh sát giao thông và cảnh sát trật tự!',
        soundType: 'car',
        emoji: '🚨'
      },
      {
        question: 'Khi ở nhà một mình có ai đó gõ cửa xưng là người quen, bé phải làm gì?',
        options: ['Không Mở Cửa Người Lạ', 'Mở Cửa Ngay', 'Mời Vào Nhà'],
        optionEmojis: ['🔒', '🚪', '🛋️'],
        correctAnswer: 'Không Mở Cửa Người Lạ',
        timeLimit: 20,
        hint: 'Bé nhớ khóa cửa cẩn thận và gọi người thân trong nhà!',
        soundType: 'bell',
        emoji: '🔑'
      },
      {
        question: 'Những vùng riêng tư trên cơ thể bé (như vùng mặc đồ bơi), người lạ có được chạm vào không?',
        options: ['Tuyệt Đối Không', 'Cho Người Lạ Chạm', 'Tùy Ý Người Lạ'],
        optionEmojis: ['🛑', '👋', '❓'],
        correctAnswer: 'Tuyệt Đối Không',
        timeLimit: 20,
        hint: 'Cơ thể bé là của riêng bé, tuyệt đối không ai được xâm phạm!',
        soundType: 'bell',
        emoji: '🛡️'
      },
      {
        question: 'Nếu có ai đó bảo "Mẹ nhờ chú đón cháu về", bé phải làm thế nào?',
        options: ['Hỏi Cô Giáo Xac Nhận', 'Tự Ý Đi Theo Ngay', 'Trèo Lên Xe Ngay'],
        optionEmojis: ['👩‍🏫', '🚶‍♂️', '🛵'],
        correctAnswer: 'Hỏi Cô Giáo Xac Nhận',
        timeLimit: 20,
        hint: 'Luôn nhờ cô giáo hoặc bảo vệ trường xác nhận với bố mẹ trước!',
        soundType: 'bell',
        emoji: '🏫'
      },
      {
        question: 'Khi bị tụt lại đằng sau rủ không thấy bố mẹ đâu trong siêu thị, bé nên tìm ai trợ giúp?',
        options: ['Chú Bảo Vệ Hoặc Thu Ngân', 'Người Lạ Đeo Mặt Nạ', 'Chạy Ra Đường Lớn'],
        optionEmojis: ['👮‍♂️', '🥷', '🛣️'],
        correctAnswer: 'Chú Bảo Vệ Hoặc Thu Ngân',
        timeLimit: 20,
        hint: 'Chú bảo vệ đồng phục hoặc cô thu ngân siêu thị sẽ gọi loa giúp bé!',
        soundType: 'bell',
        emoji: '🏬'
      },
      {
        question: 'Bé có nên tự ý cho người lạ chụp ảnh hay đăng hình thông tin cá nhân của bé không?',
        options: ['Không Tự Ý Cho Chụp', 'Đồng Ý Cho Chụp', 'Tự Đọc Số Nhà'],
        optionEmojis: ['🙅‍♀️', '📸', '🏡'],
        correctAnswer: 'Không Tự Ý Cho Chụp',
        timeLimit: 20,
        hint: 'Bảo vệ thông tin và hình ảnh cá nhân an toàn!',
        soundType: 'bell',
        emoji: '📱'
      },
      {
        question: 'Kỹ năng quy tắc 5 ngón tay dạy bé ôm hôn đối tượng nào?',
        options: ['Ông Bà Bố Mẹ Ruột', 'Người Lạ Ngoài Đường', 'Bất Kỳ Ai'],
        optionEmojis: ['👨‍👩‍👧', '🚶‍♀️', '👥'],
        correctAnswer: 'Ông Bà Bố Mẹ Ruột',
        timeLimit: 20,
        hint: 'Ngón cái gần nhất tượng trưng cho Ông Bà, Bố Mẹ, Anh Chị Em ruột!',
        soundType: 'bell',
        emoji: '🖐️'
      }
    ]
  },

  // 3. GAME KỸ NĂNG: XE CỨU HỘ & CẢNH SÁT
  {
    id: 'game_biet_doi_xe_cap_cuu',
    title: 'Biệt Đội Xe Cảnh Sát & Cứu Hộ',
    icon: '🚓',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé nhận biết âm thanh còi hụ vang và nhiệm vụ của Xe Cảnh Sát 113, Xe Cứu Hỏa 114 và Xe Cấp Cứu 115!',
    badgeTheme: 'rose',
    interactiveQuestions: [
      {
        question: 'Xe gì màu trắng có cờ Chữ Thập Đỏ chở bệnh nhân và bác sĩ đến bệnh viện?',
        options: ['Xe Cấp Cứu 115', 'Xe Cảnh Sát 113', 'Xe Cứu Hỏa 114'],
        optionEmojis: ['🚑', '🚓', '🚒'],
        correctAnswer: 'Xe Cấp Cứu 115',
        timeLimit: 20,
        hint: 'Xe cấp cứu có chuông bíp bíp khẩn cấp chở bác sĩ cứu chữa người bệnh!',
        soundType: 'car',
        emoji: '🚑'
      },
      {
        question: 'Xe gì màu xanh trắng có đèn nháy tròn trên trần do Các Chú Cảnh Sát đi tuần tra?',
        options: ['Xe Cảnh Sát 113', 'Xe Cứu Hỏa 114', 'Xe Chở Rác'],
        optionEmojis: ['🚓', '🚒', '🚛'],
        correctAnswer: 'Xe Cảnh Sát 113',
        timeLimit: 20,
        hint: 'Chú cảnh sát đi xe này giữ gìn trật tự và an toàn giao thông!',
        soundType: 'car',
        emoji: '🚓'
      },
      {
        question: 'Số điện thoại khẩn cấp gọi Xe Cấp Cứu chở bệnh nhân đến bệnh viện là số mấy?',
        options: ['Số 115 Cấp Cứu', 'Số 113 Cảnh Sát', 'Số 114 Cứu Hỏa'],
        optionEmojis: ['🚑', '🚓', '🚒'],
        correctAnswer: 'Số 115 Cấp Cứu',
        timeLimit: 20,
        hint: 'Một Một Năm là tổng đài y tế cấp cứu!',
        soundType: 'car',
        emoji: '🏥'
      },
      {
        question: 'Khi thấy xe cảnh sát hoặc xe cấp cứu hụ còi ưu tiên trên đường, các xe khác phải làm gì?',
        options: ['Tản Sang Bên Dường', 'Chạy Chắn Trước', 'Dừng Giữa Đường'],
        optionEmojis: ['🔀', '🚘', '🛑'],
        correctAnswer: 'Tản Sang Bên Dường',
        timeLimit: 20,
        hint: 'Nhường đường cho xe khẩn cấp làm nhiệm vụ cứu người!',
        soundType: 'car',
        emoji: '🚨'
      },
      {
        question: 'Bác sĩ và Cô y tá mặc trang phục màu gì để chăm sóc sức khỏe cho bé?',
        options: ['Áo Blouse Trắng', 'Bộ Đồ Màu Đen', 'Áo Vàng Rực'],
        optionEmojis: ['👩‍⚕️', '🥷', '🦺'],
        correctAnswer: 'Áo Blouse Trắng',
        timeLimit: 20,
        hint: 'Áo blouse trắng tinh khiết hiền từ của ngành y tế!',
        soundType: 'bell',
        emoji: '🩺'
      },
      {
        question: 'Chú Cảnh Sát Giao Thông thổi còi cầm gậy chỉ dẫn xe cộ để làm gì?',
        options: ['Đường Xá An Toàn', 'Cho Đường Tắc Nghẽn', 'Cho Xe Chạy Hỗn Sạn'],
        optionEmojis: ['✅', '❌', '⚠️'],
        correctAnswer: 'Đường Xá An Toàn',
        timeLimit: 20,
        hint: 'Giúp giao thông luôn thông thoáng và mọi người đi lại an toàn!',
        soundType: 'bell',
        emoji: '👮'
      },
      {
        question: 'Xe cứu thương chở bệnh nhân đến công trình nào để bác sĩ khám chữa bệnh?',
        options: ['Bệnh Viện Y Tế', 'Công Viên Giải Trí', 'Rạp Phim'],
        optionEmojis: ['🏥', '🎡', '🍿'],
        correctAnswer: 'Bệnh Viện Y Tế',
        timeLimit: 20,
        hint: 'Bệnh viện là nơi các bác sĩ và y tá chăm sóc người ốm!',
        soundType: 'car',
        emoji: '🏥'
      },
      {
        question: 'Khi gặp sự cố rò rỉ điện hoặc dây điện rơi xuống đất, bé phải làm gì?',
        options: ['Tránh Xa Vùng Điện', 'Sờ Tay Vào Dây', 'Nhảy Vào Nước'],
        optionEmojis: ['⚡', '✋', '🌊'],
        correctAnswer: 'Tránh Xa Vùng Điện',
        timeLimit: 20,
        hint: 'Điện nguy hiểm, bé không bao giờ chạm tay vào điện!',
        soundType: 'bell',
        emoji: '🔌'
      },
      {
        question: 'Phương tiện bay nào có cánh quạt to trên mái giúp bác sĩ cấp cứu ở vùng núi cao?',
        options: ['Trực Thăng Cứu Hộ', 'Tàu Thủy', 'Xe Đạp'],
        optionEmojis: ['🚁', '🚢', '🚲'],
        correctAnswer: 'Trực Thăng Cứu Hộ',
        timeLimit: 20,
        hint: 'Trực thang bay nhanh trên trời ứng cứu khẩn cấp!',
        soundType: 'car',
        emoji: '🚁'
      },
      {
        question: 'Biểu tượng hình chữ thập màu đỏ trên xe cấp cứu có ý nghĩa gì?',
        options: ['Biểu Tượng Y Tế', 'Trái Cây', 'Hình Ngôi Sao'],
        optionEmojis: ['🏥', '🍎', '⭐'],
        correctAnswer: 'Biểu Tượng Y Tế',
        timeLimit: 20,
        hint: 'Chữ thập đỏ tượng trưng cho ngành y tế cứu giúp người!',
        soundType: 'bell',
        emoji: '➕'
      }
    ]
  },

  // 4. GAME GHÉP HÌNH AN TOÀN: GHÉP XE CỨU HỘ & SỐ ĐIỆN THOẠI KHẨN CẤP
  {
    id: 'game_ghephinh_xe_cuu_ho',
    title: 'Ghép Đôi Xe Cứu Hộ & Số Khẩn Cấp',
    icon: '☎️',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé ghép Xe Cảnh Sát 🚓 với 113, Xe Cứu Hỏa 🚒 với 114, Xe Cấp Cứu 🚑 với 115!',
    badgeTheme: 'rose',
    puzzlePairs: [
      { id: 'p1', name: 'Xe Cảnh Sát Tuần Tra', symbol: '🚓', matchTarget: 'Tổng Đài 113 Cảnh Sát', targetSymbol: '📞', hint: 'Gọi 113 khi cần chú cảnh sát hỗ trợ an ninh!' },
      { id: 'p2', name: 'Xe Cứu Hỏa Chữa Cháy', symbol: '🚒', matchTarget: 'Tổng Đài 114 Cứu Hỏa', targetSymbol: '🧯', hint: 'Gọi 114 khi có sự cố hỏa hoạn cháy nổ!' },
      { id: 'p3', name: 'Xe Cấp Cứu Y Tế', symbol: '🚑', matchTarget: 'Tổng Đài 115 Y Tế', targetSymbol: '🏥', hint: 'Gọi 115 khi cần bác sĩ cấp cứu bệnh nhân!' },
      { id: 'p4', name: 'Đèn Giao Thông Đỏ', symbol: '🚦', matchTarget: 'Dừng Xe An Toàn', targetSymbol: '🛑', hint: 'Đèn đỏ báo hiệu dừng xe chờ đợi an toàn!' },
      { id: 'p5', name: 'Chú Cứu Hỏa Dũng Cảm', symbol: '👨‍🚒', matchTarget: 'Vòi Phun Nước Mạnh', targetSymbol: '💦', hint: 'Vòi phun nước dập tắt lửa nhanh chóng!' },
      { id: 'p6', name: 'Chú Cảnh Sát Giao Thông', symbol: '👮', matchTarget: 'Còi & Gậy Chỉ Đường', targetSymbol: '🦺', hint: 'Chỉ dẫn giao thông đi lại an toàn!' }
    ]
  },

  // 5. GAME GHÉP HÌNH AN TOÀN: GHÉP ĐỒ DÙNG BẢO VỆ AN TOÀN
  {
    id: 'game_ghephinh_do_dung_an_toan',
    title: 'Ghép Đồ Dùng Bảo VỆ An Toàn',
    icon: '⛑️',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé ghép Mũ bảo hiểm ⛑️ với Xe đạp 🚲, Áo phao 🦺 với Bơi lội 🏊, Bình cứu hỏa 🧯 với Đám lửa 🔥!',
    badgeTheme: 'indigo',
    puzzlePairs: [
      { id: 'p1', name: 'Mũ Bảo Hiểm Xinh', symbol: '⛑️', matchTarget: 'Bé Tập Đi Xe Đạp', targetSymbol: '🚲', hint: 'Bé đội mũ bảo hiểm bảo vệ đầu khi tập đi xe đạp!' },
      { id: 'p2', name: 'Áo Phao Bơi Cứu Sinh', symbol: '🦺', matchTarget: 'Bé Tập Bơi Dưới Ao', targetSymbol: '🏊', hint: 'Mặc áo phao giúp bé nổi an toàn khi tập bơi!' },
      { id: 'p3', name: 'Bình Cứu Hỏa Đỏ', symbol: '🧯', matchTarget: 'Đám Lửa Nhỏ', targetSymbol: '🔥', hint: 'Dùng bình cứu hỏa dập tắt ngọn lửa nhỏ!' },
      { id: 'p4', name: 'Dây An Toàn Ô Ô', symbol: '🎗️', matchTarget: 'Ghế Ngồi Xe Ô Ô', targetSymbol: '🚘', hint: 'Bé thắt dây an toàn khi ngồi trên ô tô!' },
      { id: 'p5', name: 'Kính Bảo Hộ Mắt', symbol: '🥽', matchTarget: 'Bé Tập Thí Nghiệm', targetSymbol: '🧪', hint: 'Bảo vệ đôi mắt bé luôn an toàn rực rỡ!' },
      { id: 'p6', name: 'Khăn Ứơt Lau Mặt', symbol: '🧼', matchTarget: 'Khói Đen Hỏa Hoạn', targetSymbol: '🌫️', hint: 'Bịt khăn ướt lên mũi miệng tránh hít khói độc!' }
    ]
  },

  // === DÒNG GAME 2: TRÒ CHƠI TÍCH HỢP TÍNH NĂNG CAMERA (TƯƠNG TÁC THỊ GIÁC, CHUYỂN ĐỘNG & BIẾN HÌNH) ===

  // 6. GAME CAMERA: BIẾN HÌNH NHÂN VẬT HOẠT HÌNH
  {
    id: 'game_camera_transform',
    title: 'Biến Hình Nhân Vật Hoạt Hình',
    icon: '✨',
    ageGroup: '3-5 tuổi',
    gameType: 'camera_transform',
    description: 'Tạo hình trẻ em thành nhân vật ngộ nghĩnh: Khủng Long Dino, Hổ Vàng, Siêu Nhân Cầu Vồng, Công Chúa Hoa Cúc khi đứng trước camera!',
    badgeTheme: 'emerald',
    bannerImage: '/src/assets/images/kid_camera_faces_1794370847143.jpg'
  },

  // 7. GAME CAMERA: BÉ BẮT BONG BÓNG & QUẢ NGỌT
  {
    id: 'game_camera_bubbles',
    title: 'Bé Bắt Bong Bóng & Quả Ngọt',
    icon: '🫧',
    ageGroup: '3-5 tuổi',
    gameType: 'camera_ar',
    description: 'Bé vẫy tay trước camera hoặc chạm vào màn hình để nổ bong bóng và thu thập trái cây thơm ngon!',
    badgeTheme: 'cyan',
    bannerImage: '/src/assets/images/kid_camera_bubbles_1794368979884.jpg'
  },

  // 8. GAME CAMERA: GƯƠNG THẦN BIỂU CẢM & MẶT NẠ VUI NHỘN
  {
    id: 'game_camera_faces',
    title: 'Gương Thần Biểu Cảm & Mặt Nạ Vui',
    icon: '🪞',
    ageGroup: '3-5 tuổi',
    gameType: 'camera_faces',
    description: 'Bé soi gương camera đội nón khủng long, đeo tai hổ, cười toe toét và chụp những bức hình kỷ niệm siêu đáng yêu!',
    badgeTheme: 'rose',
    bannerImage: '/src/assets/images/kid_camera_faces_1794370847143.jpg'
  },

  // 9. GAME CAMERA: VŨ ĐIỆU BẮT SAO VŨ TRỤ
  {
    id: 'game_camera_stars',
    title: 'Vũ Điệu Bắt Sao Vũ Trụ',
    icon: '⭐',
    ageGroup: '3-5 tuổi',
    gameType: 'camera_stars',
    description: 'Các ngôi sao băng lấp lánh đang rơi! Bé dùng 2 bàn tay hứng sao vào chiếc giỏ ma thuật cùng bạn Khủng Long Dino!',
    badgeTheme: 'indigo',
    bannerImage: '/src/assets/images/kid_camera_stars_1794368979884.jpg'
  },

  // === DÒNG GAME 3: NĂNG ĐỘNG, BẮN CUNG, VƯỢT CHƯỚNG NGẠI VẬT & ĐUA XE CẢNH SÁT ===

  // 10. GAME BẮN CUNG: BẮN CUNG TÊN QUẢ NGỌT & BONG BÓNG
  {
    id: 'game_archery_fun',
    title: 'Bắn Cung Tên Quả Ngọt & Bong Bóng',
    icon: '🏹',
    ageGroup: '3-5 tuổi',
    gameType: 'archery_fun',
    description: 'Bé kéo dây cung đồ chơi và thả mũi tên đầu cao su ngộ nghĩnh trúng các mục tiêu quả táo, dưa hấu, hái ngàn sao thưởng!',
    badgeTheme: 'amber',
    bannerImage: '/src/assets/images/kid_archery_fun_1794371559510.jpg'
  },

  // 11. GAME VƯỢT CHƯỚNG NGẠI VẬT: CUỘC PHIÊU LƯU VƯỢT CHƯỚNG NGẠI VẬT
  {
    id: 'game_obstacle_runner',
    title: 'Vượt Chướng Ngại Vật Khỏe Vui',
    icon: '🏃',
    ageGroup: '3-5 tuổi',
    gameType: 'obstacle_runner',
    description: 'Bé cùng bạn Hổ Vàng nhảy qua khối gỗ, vũng nước, ăn sao vàng và trái cây trên đường đua đồng cỏ sinh động!',
    badgeTheme: 'emerald',
    bannerImage: '/src/assets/images/kid_runner_jump_1794371559321.jpg'
  },

  // 12. GAME ĐUA XE: ĐUA XE THÚ CƯNG CẦU VỒNG
  {
    id: 'game_pet_racing',
    title: 'Đua Xe Thú Cưng Cầu Vồng',
    icon: '🏎️',
    ageGroup: '3-5 tuổi',
    gameType: 'pet_racer',
    description: 'Kịch tính và vui nhộn! Bạn Khủng Long, Cún Con và Hổ Vàng đua xe siêu tốc trên đường đua cầu vồng rực rỡ!',
    badgeTheme: 'rose',
    bannerImage: '/src/assets/images/kid_pet_racing_1794368980202.jpg'
  },

  // 13. GAME ÂM NHẠC: ĐÀN PHÍM MA THUẬT & ÂM THANH
  {
    id: 'game_music_piano',
    title: 'Đàn Phím Âm Nhạc & Muông Thú',
    icon: '🎹',
    ageGroup: '3-5 tuổi',
    gameType: 'music_piano',
    description: 'Bé gõ các phím đàn piano khổng lồ phát sáng và nghe tiếng kêu vui nhộn của chó, mèo, vịt, bò sữa!',
    badgeTheme: 'indigo'
  },

  // 14. GAME VẬN ĐỘNG: VÒNG QUAY VẬN ĐỘNG KHỎE VUI
  {
    id: 'game_action_wheel',
    title: 'Vòng Quay Vận Động Khỏe Vui',
    icon: '🎡',
    ageGroup: '3-5 tuổi',
    gameType: 'action_wheel',
    description: 'Bé quay bánh xe may mắn và cùng nhảy như thỏ, vỗ cánh như chim, vươn vai như gấu thật khỏe mạnh!',
    badgeTheme: 'cyan'
  },

  // === DÒNG GAME 4: GHÉP HÌNH DỄ THƯƠNG (CUTE MATCHING PUZZLES) ===

  // 15. GAME GHÉP HÌNH: GHÉP ĐỒ CHƠI XINH YÊU
  {
    id: 'game_ghephinh_do_choi',
    title: 'Ghép Đồ Chơi Xinh Yêu Cho Bé',
    icon: '🧸',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé nối hình gấu bông, xe gỗ, búp bê, chong chóng với những chiếc hộp quà tương ứng xinh xắn!',
    badgeTheme: 'rose',
    puzzlePairs: [
      { id: 'p1', name: 'Gấu Bông Tròn', symbol: '🧸', matchTarget: 'Hộp Quà Thắt Nơ', targetSymbol: '🎁', hint: 'Chú gấu bông êm mềm nằm trong hộp quà tặng bé!' },
      { id: 'p2', name: 'Xe Ô Tô Gỗ', symbol: '🚗', matchTarget: 'Đường Tàu Siêu Tốc', targetSymbol: '🛣️', hint: 'Xe ô tô gỗ chạy bon bon trên con đường xinh!' },
      { id: 'p3', name: 'Chong Chóng Màu', symbol: '🪁', matchTarget: 'Cơn Gió Nhẹ Bay', targetSymbol: '🍃', hint: 'Gió thổi làm chong chóng xoay tít rực rỡ!' },
      { id: 'p4', name: 'Búp Bê Xinh Xắn', symbol: '🪆', matchTarget: 'Ngôi Nhà Đồ Chơi', targetSymbol: '🏡', hint: 'Búp bê ngoan ở trong ngôi nhà đồ chơi ấm áp!' },
      { id: 'p5', name: 'Quả Bóng Tròn', symbol: '⚽', matchTarget: 'Khung Thành Nhỏ', targetSymbol: '🥅', hint: 'Quả bóng lăn vào khung thành cho bé reo vui!' },
      { id: 'p6', name: 'Bộ Xếp Hình Khối', symbol: '🧩', matchTarget: 'Tòa Tháp Cầu Vồng', targetSymbol: '🏰', hint: 'Bé xếp từng khối gỗ thành tòa tháp cao thật đẹp!' }
    ]
  },

  // 16. GAME GHÉP HÌNH: VŨ TRỤ KỲ THÚ
  {
    id: 'game_ghephinh_vu_tru',
    title: 'Ghép Đôi Vũ Trụ Kỳ Thú',
    icon: '🚀',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé cùng khám phá dải ngân hà, tàu con thoi và những vì sao lung linh bằng hình ảnh biểu tượng to rõ!',
    badgeTheme: 'indigo',
    puzzlePairs: [
      { id: 'p1', name: 'Phi Hành Gia', symbol: '👨‍🚀', matchTarget: 'Mặt Trăng Tròn', targetSymbol: '🌕', hint: 'Chú phi hành gia bay vào không gian để đặt chân lên Mặt Trăng!' },
      { id: 'p2', name: 'Tên Lửa Siêu Tốc', symbol: '🚀', matchTarget: 'Trạm Không Gian', targetSymbol: '🛰️', hint: 'Tên lửa bay vút lên bầu trời để cập bến trạm không gian!' },
      { id: 'p3', name: 'Kính Thiên Văn', symbol: '🔭', matchTarget: 'Ngôi Sao Lấp Lánh', targetSymbol: '⭐', hint: 'Bé dùng kính thiên văn ngắm nhìn các vì sao lung linh trên cao!' },
      { id: 'p4', name: 'Trái Đất Xanh', symbol: '🌍', matchTarget: 'Mặt Trời Tỏa Nắng', targetSymbol: '☀️', hint: 'Hành tinh xanh của chúng ta quay quanh Ông Mặt Trời ấm áp!' },
      { id: 'p5', name: 'Vệ Tinh Nhân Tạo', symbol: '📡', matchTarget: 'Tín Hiệu Sóng', targetSymbol: '📶', hint: 'Vệ tinh bay trên quỹ đạo phát sóng truyền tin về Trái Đất!' },
      { id: 'p6', name: 'Sao Băng Rực Sáng', symbol: '🌠', matchTarget: 'Bầu Trời Đêm', targetSymbol: '🌌', hint: 'Ngôi sao băng vụt sáng trên bầu trời đêm để bé ước mơ!' }
    ]
  },

  // 17. GAME GHÉP HÌNH: THỨC ĂN MUÔNG THÚ
  {
    id: 'game_ghephinh_thuc_an_dong_vat',
    title: 'Ghép Thức Ăn Cho Muông Thú',
    icon: '🥕',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé xem hình con vật và nối với hình ảnh món ăn khoái khẩu của từng bạn!',
    badgeTheme: 'emerald',
    puzzlePairs: [
      { id: 'p1', name: 'Bạn Thỏ Trắng', symbol: '🐰', matchTarget: 'Củ Cà Rốt Ngọt', targetSymbol: '🥕', hint: 'Củ màu cam tươi mọc dưới đất mà bạn thỏ rất mê!' },
      { id: 'p2', name: 'Chú Khỉ Nâu', symbol: '🐒', matchTarget: 'Nải Chuối Vàng', targetSymbol: '🍌', hint: 'Quả cong cong vỏ vàng thơm lừng chú khỉ thích chuyền cành hái ăn!' },
      { id: 'p3', name: 'Mèo Mướp Ngoan', symbol: '🐱', matchTarget: 'Đĩa Cá Tươi Ngon', targetSymbol: '🐟', hint: 'Mèo thích ăn cá rán giòn thơm phức!' },
      { id: 'p4', name: 'Cún Con Dễ Thương', symbol: '🐶', matchTarget: 'Khúc Xương Giòn', targetSymbol: '🦴', hint: 'Cún thích gặm khúc xương và vẫy đuôi mừng rỡ!' },
      { id: 'p5', name: 'Gấu Trúc Dễ Thương', symbol: '🐼', matchTarget: 'Cành Trúc Xanh', targetSymbol: '🎋', hint: 'Gấu trúc tròn xoe thích nhai lá và cành tre trúc xanh mướt!' },
      { id: 'p6', name: 'Cô Bò Sữa', symbol: '🐮', matchTarget: 'Đồng Cỏ Tươi', targetSymbol: '🌿', hint: 'Bò sữa ăn cỏ xanh để cho các bé dòng sữa ngọt ngào!' }
    ]
  },

  // 18. GAME GHÉP HÌNH: NGHỀ NGHIỆP & DỤNG CỤ
  {
    id: 'game_ghephinh_nghe_nghiep',
    title: 'Bé Ghép Nghề Nghiệp & Dụng Cụ',
    icon: '🩺',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Khám phá công việc của Bác sĩ, Cô giáo, Chú cứu hỏa qua các hình ảnh trực quan!',
    badgeTheme: 'purple',
    puzzlePairs: [
      { id: 'p1', name: 'Bác Sĩ Tận Tâm', symbol: '🩺', matchTarget: 'Bệnh Viện & Thuốc', targetSymbol: '🏥', hint: 'Bác sĩ đeo ống nghe khám bệnh giúp các bé luôn khỏe mạnh!' },
      { id: 'p2', name: 'Chú Cứu Hỏa', symbol: '🚒', matchTarget: 'Bình Cứu Hỏa & Nước', targetSymbol: '🧯', hint: 'Dụng cụ giúp dập tắt đám lửa bảo vệ mọi người!' },
      { id: 'p3', name: 'Cô Giáo Mầm Non', symbol: '👩‍🏫', matchTarget: 'Sách & Bảng Phấn', targetSymbol: '📚', hint: 'Cô giáo kể chuyện cổ tích và dạy bé hát những bài ca vui!' },
      { id: 'p4', name: 'Bác Đầu Bếp', symbol: '👨‍🍳', matchTarget: 'Chảo Chiên & Đồ Ăn', targetSymbol: '🍳', hint: 'Đầu bếp nấu những món ăn thơm ngon bổ dưỡng cho bé!' },
      { id: 'p5', name: 'Chú Cảnh Sát', symbol: '👮', matchTarget: 'Còi & Xe Tuần Tra', targetSymbol: '🚓', hint: 'Chú thổi còi chỉ dẫn xe cộ đi đúng làn đường an toàn!' },
      { id: 'p6', name: 'Họa Sĩ Sáng Tạo', symbol: '🎨', matchTarget: 'Bảng Màu & Cọ Vẽ', targetSymbol: '🖌️', hint: 'Họa sĩ cầm cọ vẽ nên những bức tranh cầu vồng rực rỡ!' }
    ]
  },

  // === DÒNG GAME 5: QUIZ GIÁO DỤC MẦM NON KHÁC ===

  // 19. GAME ĐỐ VUI: ĐỘNG VẬT VUI NHỘN
  {
    id: 'game_dong_vat_vui_nhon',
    title: 'Thế Giới Động Vật Vui Nhộn',
    icon: '🦁',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé nhìn hình ảnh to rõ, lắng nghe âm thanh và chọn đúng con vật đáng yêu!',
    badgeTheme: 'amber',
    interactiveQuestions: [
      {
        question: 'Con gì kêu "Gâu gâu", thích gặm xương và vẫy đuôi mừng bé?',
        options: ['Chú Chó Con', 'Chú Mèo Con', 'Chú Gà Trống'],
        optionEmojis: ['🐶', '🐱', '🐓'],
        correctAnswer: 'Chú Chó Con',
        timeLimit: 20,
        hint: 'Bạn này rất trung thành và hay vẫy đuôi mừng bé!',
        soundType: 'dog',
        emoji: '🐶'
      },
      {
        question: 'Con vật nào có chiếc vòi thật dài và hai tai to như cái quạt?',
        options: ['Chú Voi Con', 'Hươu Cao Cổ', 'Chú Sư Tử'],
        optionEmojis: ['🐘', '🦒', '🦁'],
        correctAnswer: 'Chú Voi Con',
        timeLimit: 20,
        hint: 'Chú voi thích hút nước bằng vòi phun mưa tắm mát!',
        soundType: 'lion',
        emoji: '🐘'
      },
      {
        question: 'Con gì kêu "Meo meo", thích ăn cá và giỏi bắt chuột?',
        options: ['Chú Mèo Con', 'Chú Thỏ Trắng', 'Bé Chuột Nhắt'],
        optionEmojis: ['🐱', '🐰', '🐭'],
        correctAnswer: 'Chú Mèo Con',
        timeLimit: 20,
        hint: 'Bạn ấy có ria mép dài và bộ lông rất êm mềm!',
        soundType: 'cat',
        emoji: '🐱'
      },
      {
        question: 'Bạn nào có đôi tai dài, thích ăn củ cà rốt đỏ cam và nhảy thoăn thoắt?',
        options: ['Chú Thỏ Trắng', 'Chú Gấu Nâu', 'Bác Rùa'],
        optionEmojis: ['🐰', '🐻', '🐢'],
        correctAnswer: 'Chú Thỏ Trắng',
        timeLimit: 20,
        hint: 'Bạn thỏ trắng có đôi mắt tròn xoe như hai hạt ngọc!',
        soundType: 'bell',
        emoji: '🐰'
      },
      {
        question: 'Con gì gáy "Ò ó o..." đánh thức bé dậy đi học mỗi sáng sớm?',
        options: ['Chú Gà Trống', 'Chú Vịt Bầu', 'Chim Bồ Câu'],
        optionEmojis: ['🐓', '🦆', '🕊️'],
        correctAnswer: 'Chú Gà Trống',
        timeLimit: 20,
        hint: 'Chú có chiếc mào đỏ rực trên đầu thật oai vệ!',
        soundType: 'bird',
        emoji: '🐓'
      },
      {
        question: 'Con vật nào được mệnh danh là "Chúa sơn lâm" với chiếc bờm dũng mãnh?',
        options: ['Sư Tử Oai Hùng', 'Khỉ Tinh Nghịch', 'Sóc Nhỏ'],
        optionEmojis: ['🦁', '🐒', '🐿️'],
        correctAnswer: 'Sư Tử Oai Hùng',
        timeLimit: 20,
        hint: 'Tiếng gầm của chú vang rền khắp thảo nguyên!',
        soundType: 'lion',
        emoji: '🦁'
      },
      {
        question: 'Con gì biết bơi lội dưới nước, kêu "Cạp cạp" tìm tôm cá?',
        options: ['Chú Vịt Vàng', 'Con Heo Mũm Mĩm', 'Bạn Cừu Trắng'],
        optionEmojis: ['🦆', '🐷', '🐑'],
        correctAnswer: 'Chú Vịt Vàng',
        timeLimit: 20,
        hint: 'Bạn vịt có đôi chân màng chèo bơi thoăn thoắt!',
        soundType: 'bell',
        emoji: '🦆'
      },
      {
        question: 'Con gì có bộ lông sọc trắng đen rực rỡ chạy trên đồng cỏ xanh?',
        options: ['Chú Ngựa Vằn', 'Chú Bò Sữa', 'Chú Thỏ'],
        optionEmojis: ['🦓', '🐮', '🐰'],
        correctAnswer: 'Chú Ngựa Vằn',
        timeLimit: 20,
        hint: 'Bộ lông sọc đen trắng rất độc đáo!',
        soundType: 'bell',
        emoji: '🦓'
      },
      {
        question: 'Con gì thích leo trèo trên cây ăn chuối chín thơm?',
        options: ['Chú Khỉ Nâu Tinh Nghịch', 'Bác Rùa Già', 'Chú Heo Ủn Ỉn'],
        optionEmojis: ['🐒', '🐢', '🐷'],
        correctAnswer: 'Chú Khỉ Nâu Tinh Nghịch',
        timeLimit: 20,
        hint: 'Chú khỉ có cái đuôi dài đánh đu trên cành cây!',
        soundType: 'bell',
        emoji: '🐒'
      },
      {
        question: 'Bạn nào cho bé dòng sữa thơm ngọt mỗi ngày?',
        options: ['Cô Bò Sữa Hiền Lành', 'Chú Cáo Đỏ', 'Bé Sóc Nhỏ'],
        optionEmojis: ['🐮', '🦊', '🐿️'],
        correctAnswer: 'Cô Bò Sữa Hiền Lành',
        timeLimit: 20,
        hint: 'Cô bò sữa thong thả gặm cỏ tươi trên đồng!',
        soundType: 'bell',
        emoji: '🐮'
      }
    ]
  },

  // 20. GAME ĐỐ VUI: SẮC MÀU & HÌNH KHỐI
  {
    id: 'game_sac_mau_hinh_khoi',
    title: 'Sắc Màu & Hình Khối Thần Kỳ',
    icon: '🎨',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Nhận biết hình khối và sắc màu thiên nhiên với các hình vẽ to trực quan!',
    badgeTheme: 'cyan',
    interactiveQuestions: [
      {
        question: 'Quả dưa hấu khi bổ ra, bên trong ruột thường có màu gì ngọt ngào?',
        options: ['Màu Đỏ Tươi', 'Màu Xanh Biển', 'Màu Tím'],
        optionEmojis: ['🔴', '🔵', '🟣'],
        correctAnswer: 'Màu Đỏ Tươi',
        timeLimit: 20,
        hint: 'Màu đỏ giống như quả dâu tây và hoa phượng vĩ!',
        soundType: 'bell',
        emoji: '🍉'
      },
      {
        question: 'Mặt Trời chiếu sáng ban ngày trên cao có hình gì hả bé?',
        options: ['Hình Tròn', 'Hình Vuông', 'Hình Ngôi Sao'],
        optionEmojis: ['🟡', '🟧', '⭐'],
        correctAnswer: 'Hình Tròn',
        timeLimit: 20,
        hint: 'Tròn vo giống như quả bóng lăn trên sân cỏ!',
        soundType: 'star',
        emoji: '☀️'
      },
      {
        question: 'Lá cây non ngoài vườn vào mùa xuân thường có màu gì tươi mát?',
        options: ['Màu Xanh Lá Cây', 'Màu Nâu Đất', 'Màu Trắng Tinh'],
        optionEmojis: ['🟢', '🟤', '⚪'],
        correctAnswer: 'Màu Xanh Lá Cây',
        timeLimit: 20,
        hint: 'Màu của lá cây giúp thiên nhiên mát rượi!',
        soundType: 'bell',
        emoji: '🍃'
      },
      {
        question: 'Chiếc nón lá truyền thống của các cô giáo và bà có dáng hình gì?',
        options: ['Hình Tam Giác Nhọn', 'Hình Tròn Xoe', 'Hình Chữ Nhật'],
        optionEmojis: ['🔺', '⚪', '▭'],
        correctAnswer: 'Hình Tam Giác Nhọn',
        timeLimit: 20,
        hint: 'Hình có 3 góc nhọn chóp nón che mưa che nắng!',
        soundType: 'bell',
        emoji: '👒'
      },
      {
        question: 'Chiếc bánh Chưng ngày Tết cổ truyền của dân tộc có hình gì vuông vắn?',
        options: ['Hình Vuông', 'Hình Bầu Dục', 'Hình Tròn'],
        optionEmojis: ['🟩', '⬭', '🟢'],
        correctAnswer: 'Hình Vuông',
        timeLimit: 20,
        hint: 'Bánh Chưng hình vuông tượng trưng cho Mặt Đất bao la!',
        soundType: 'bell',
        emoji: '🟩'
      },
      {
        question: 'Bầu trời lúc trời quang ban ngày hoặc biển khơi có màu gì?',
        options: ['Màu Xanh Da Trời', 'Màu Hồng Nhạt', 'Màu Đen'],
        optionEmojis: ['🟦', '🌸', '⬛'],
        correctAnswer: 'Màu Xanh Da Trời',
        timeLimit: 20,
        hint: 'Màu xanh êm dịu và bao la vô tận!',
        soundType: 'star',
        emoji: '🌊'
      },
      {
        question: 'Ngôi sao 5 cánh trên lá cờ Tổ quốc có màu gì rực rỡ?',
        options: ['Màu Vàng Tươi', 'Màu Tím', 'Màu Nâu'],
        optionEmojis: ['⭐', '🟣', '🟤'],
        correctAnswer: 'Màu Vàng Tươi',
        timeLimit: 20,
        hint: 'Ngôi sao vàng 5 cánh tỏa sáng trên nền cờ đỏ!',
        soundType: 'star',
        emoji: '⭐'
      },
      {
        question: 'Quả dải cầu vồng xuất hiện sau cơn mưa thường có mấy sắc màu lấp lánh?',
        options: ['7 Sắc Cầu Vồng', '1 Màu Duy Nhất', '2 Màu Đen Trắng'],
        optionEmojis: ['🌈', '⚪', '⬛'],
        correctAnswer: '7 Sắc Cầu Vồng',
        timeLimit: 20,
        hint: 'Cầu vồng có 7 màu: Đỏ, cam, vàng, lục, lam, chàm, tím!',
        soundType: 'bell',
        emoji: '🌈'
      },
      {
        question: 'Tờ giấy vẽ tranh khen thưởng học sinh ngoan có dạng hình gì?',
        options: ['Hình Chữ Nhật', 'Hình Tròn', 'Hình Tam Giác'],
        optionEmojis: ['📄', '⚪', '🔺'],
        correctAnswer: 'Hình Chữ Nhật',
        timeLimit: 20,
        hint: 'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn bằng nhau!',
        soundType: 'bell',
        emoji: '📜'
      },
      {
        question: 'Quả cam chín ngọt lịm có hình khối gì dễ lăn tròn trên bàn?',
        options: ['Hình Cầu Tròn', 'Hình Hộp Vuông', 'Hình Nón'],
        optionEmojis: ['🍊', '📦', '🍦'],
        correctAnswer: 'Hình Cầu Tròn',
        timeLimit: 20,
        hint: 'Quả cam tròn vo như quả bóng nhỏ!',
        soundType: 'star',
        emoji: '🍊'
      }
    ]
  },

  // === DÒNG GAME MỚI (BỔ SUNG THEO XU HƯỚNG TƯƠNG TÁC MẦM NON MỚI NHẤT) ===

  // 21. GAME KỸ NĂNG: AN TOÀN ĐIỆN VÀ NƯỚC Ở NHÀ
  {
    id: 'game_an_toan_dien_nuoc',
    title: 'Bé Giữ An Toàn Điện & Nước Ở Nhà',
    icon: '🔌',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé học cách không chạm tay ướt vào ổ điện, cẩn thận vòi nước nóng và dọn dẹp đồ chơi gọn gàng!',
    badgeTheme: 'amber',
    interactiveQuestions: [
      {
        question: 'Khi tay bé đang ướt nước, bé có được sờ vào ổ cắm điện không?',
        options: ['Tuyệt Đối Không Chạm', 'Chạm Vào Vui Chơi', 'Lấy Que Chọc Vào'],
        optionEmojis: ['🛑', '⚡', '🥢'],
        correctAnswer: 'Tuyệt Đối Không Chạm',
        timeLimit: 20,
        hint: 'Nước dẫn điện rất nguy hiểm, tay ướt không bao giờ được chạm vào ổ điện nha con!',
        soundType: 'bell',
        emoji: '🔌'
      },
      {
        question: 'Khi thấy phích cắm điện bị hở tia lửa hoặc khét, bé phải gọi ai ngay?',
        options: ['Gọi Bố Mẹ Hoặc Người Lớn', 'Tự Lấy Tay Kéo Dây', 'Đổ Nước Vào'],
        optionEmojis: ['👨‍👩‍👧', '✋', '💧'],
        correctAnswer: 'Gọi Bố Mẹ Hoặc Người Lớn',
        timeLimit: 20,
        hint: 'Luôn báo ngay cho bố mẹ hoặc cô giáo xử lý an toàn nè!',
        soundType: 'bell',
        emoji: '⚠️'
      },
      {
        question: 'Khi tắm vòi sen, trước khi xả nước vào người bé cần làm gì?',
        options: ['Nhờ Bố Mẹ Thử Nước Ấm', 'Nhảy Vào Nước Sôi', 'Uống Nước Bồn'],
        optionEmojis: ['🛁', '♨️', '🚰'],
        correctAnswer: 'Nhờ Bố Mẹ Thử Nước Ấm',
        timeLimit: 20,
        hint: 'Thử độ ấm vừa vặn giúp bé tắm mát mà không bị bỏng nha con!',
        soundType: 'bell',
        emoji: '🚿'
      },
      {
        question: 'Đồ chơi sắc nhọn hoặc kéo cắt giấy, bé có được cầm chạy nhảy lung tung không?',
        options: ['Không Cầm Chạy Nhảy', 'Cầm Chạy Tung Tăng', 'Ném Sang Bạn'],
        optionEmojis: ['🙅‍♂️', '🏃', '✂️'],
        correctAnswer: 'Không Cầm Chạy Nhảy',
        timeLimit: 20,
        hint: 'Vật sắc nhọn dễ làm đau bé, cần ngồi yên và nhờ cô giáo hỗ trợ nè!',
        soundType: 'bell',
        emoji: '✂️'
      },
      {
        question: 'Chơi xong đồ chơi xếp hình, bé ngoan nên làm gì để nhà cửa gọn gàng?',
        options: ['Thu Vào Giỏ Gọn Gàng', 'Vứt Bừa Bãi Ra Sàn', 'Đá Sang Góc Nhà'],
        optionEmojis: ['🧺', '🧸', '🗑️'],
        correctAnswer: 'Thu Vào Giỏ Gọn Gàng',
        timeLimit: 20,
        hint: 'Dọn đồ chơi giúp sàn nhà sạch sẽ và bé không bị vấp ngã nha con!',
        soundType: 'bell',
        emoji: '📦'
      },
      {
        question: 'Ấm nước đang sôi bốc khói trên bếp, bé có được đến gần chạm tay vào không?',
        options: ['Tránh Xa Bếp Nóng', 'Sờ Tay Vào Ấm', 'Bê Ấm Nước Đi'],
        optionEmojis: ['🛑', '✋', '🫖'],
        correctAnswer: 'Tránh Xa Bếp Nóng',
        timeLimit: 20,
        hint: 'Bếp nóng nguy hiểm lắm, bé đứng xa khu vực bếp nấu nướng nha!',
        soundType: 'bell',
        emoji: '🫖'
      },
      {
        question: 'Khi trời mưa to sấm chớp đùng đoàng, bé nên ở đâu an toàn nhất?',
        options: ['Ở Trong Nhà Kín Cửa', 'Đứng Dưới Gốc Cây To', 'Tắm Mưa Ngoài Đồng'],
        optionEmojis: ['🏠', '🌳', '🌧️'],
        correctAnswer: 'Ở Trong Nhà Kín Cửa',
        timeLimit: 20,
        hint: 'Ở trong nhà ấm áp giúp bé an toàn trước sấm sét và mưa to nè!',
        soundType: 'bell',
        emoji: '⚡'
      },
      {
        question: 'Thuốc uống của người lớn để trong tủ, bé có được tự ý lấy uống không?',
        options: ['Không Được Tự Ý Uống', 'Lấy Uống Thử', 'Tưởng Là Kẹo Ăn'],
        optionEmojis: ['🙅‍♀️', '💊', '🍬'],
        correctAnswer: 'Không Được Tự Ý Uống',
        timeLimit: 20,
        hint: 'Chỉ uống thuốc khi được bác sĩ và bố mẹ cho phép nha con!',
        soundType: 'bell',
        emoji: '💊'
      },
      {
        question: 'Khi rửa tay xong ở bồn rửa, bé nhớ làm gì để tiết kiệm nước sạch?',
        options: ['Vặn Khóa Vòi Nước Lại', 'Mở Nước Chảy Tràn', 'Bỏ Đi Chơi'],
        optionEmojis: ['🚰', '🌊', '🏃'],
        correctAnswer: 'Vặn Khóa Vòi Nước Lại',
        timeLimit: 20,
        hint: 'Khóa vòi nước bảo vệ nguồn nước sạch và giúp nhà vệ sinh khô ráo!',
        soundType: 'bell',
        emoji: '💧'
      },
      {
        question: 'Dây điện thoại đang cắm sạc pin, bé có được ngậm hay giật mạnh không?',
        options: ['Tuyệt Đối Không Giật Dây', 'Ngậm Đầu Dây Sạc', 'Kéo Rê Khắp Nhà'],
        optionEmojis: ['🛑', '📱', '🔌'],
        correctAnswer: 'Tuyệt Đối Không Giật Dây',
        timeLimit: 20,
        hint: 'Bảo vệ nguồn điện an toàn cho bé và cả gia đình nè!',
        soundType: 'bell',
        emoji: '🔋'
      }
    ]
  },

  // 22. GAME GHÉP HÌNH: PHÂN LOẠI RÁC VÀ BẢO VỆ MÔI TRƯỜNG
  {
    id: 'game_ghephinh_bao_ve_moi_truong',
    title: 'Bé Yêu Môi Trường & Phân Loại Rác',
    icon: '🌱',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé ghép lá cây với thùng rác hữu cơ, chai nhựa với thùng tái chế và trồng cây xanh!',
    badgeTheme: 'emerald',
    puzzlePairs: [
      { id: 'p1', name: 'Vỏ Chuối Chín', symbol: '🍌', matchTarget: 'Thùng Rác Hữu Cơ Xanh', targetSymbol: '🟢', hint: 'Vỏ trái cây phân hủy làm phân bón hữu cơ tươi tốt cho cây trồng!' },
      { id: 'p2', name: 'Chai Nước Nhựa', symbol: '🍶', matchTarget: 'Thùng Nhựa Tái Chế', targetSymbol: '♻️', hint: 'Chai nhựa thu gom để tái chế thành đồ dùng mới xinh xắn!' },
      { id: 'p3', name: 'Cây Con Xanh Mát', symbol: '🌱', matchTarget: 'Bình Tưới Nước Vòi', targetSymbol: '🚿', hint: 'Tưới nước mỗi ngày để mầm non lớn nhanh thành bóng mát!' },
      { id: 'p4', name: 'Vỏ Hộp Sữa Giấy', symbol: '🧃', matchTarget: 'Thùng Giấy Tái Chế', targetSymbol: '📦', hint: 'Xếp dẹp vỏ hộp sữa giấy bỏ vào thùng tái chế bảo vệ môi trường!' },
      { id: 'p5', name: 'Bóng Đèn Cũ Hỏng', symbol: '💡', matchTarget: 'Thùng Rác Nguy Hại', targetSymbol: '⚠️', hint: 'Bóng đèn thủy tinh cẩn thận phân loại riêng an toàn!' },
      { id: 'p6', name: 'Bông Hoa Rực Rỡ', symbol: '🌸', matchTarget: 'Ong Mật & Bướm Vàng', targetSymbol: '🐝', hint: 'Hoa nở thơm ngát mời bạn ong bướm đến hút mật hoa ngọt!' }
    ]
  },

  // 23. GAME GHÉP HÌNH: ĐỒ DÙNG HỌC TẬP MẪU GIÁO
  {
    id: 'game_ghephinh_do_dung_hoc_tap',
    title: 'Ghép Đồ Dùng Học Tập Mầm Non',
    icon: '🎒',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé ghép bút chì màu với vở vẽ, kéo thủ công với giấy màu, cặp sách với trường học!',
    badgeTheme: 'indigo',
    puzzlePairs: [
      { id: 'p1', name: 'Hộp Sáp Màu Đẹp', symbol: '🖍️', matchTarget: 'Trang Vở Vẽ Trắng', targetSymbol: '📄', hint: 'Dùng bút sáp màu tô vẽ cầu vồng và ngôi nhà mơ ước!' },
      { id: 'p2', name: 'Cặp Sách Mầm Non', symbol: '🎒', matchTarget: 'Trường Mẫu Giáo Vui', targetSymbol: '🏫', hint: 'Đeo cặp sách xinh cùng bạn đến lớp học bao điều hay!' },
      { id: 'p3', name: 'Kéo Thủ Công An Toàn', symbol: '✂️', matchTarget: 'Tờ Giấy Màu Xếp Hình', targetSymbol: '📜', hint: 'Kéo đầu tròn giúp bé cắt dán hình chú cá bơi lội!' },
      { id: 'p4', name: 'Hũ Hồ Dán Giấy', symbol: '🧴', matchTarget: 'Tranh Ghép Lá Cây', targetSymbol: '🍁', hint: 'Bôi hồ dán các chiếc lá thành hình chú chim xinh xắn!' },
      { id: 'p5', name: 'Bình Nước Bé Mang', symbol: '🍼', matchTarget: 'Khăn Lau Tay Sạch', targetSymbol: '🧼', hint: 'Uống nước đầy đủ và lau tay sạch sẽ trước khi vào lớp!' },
      { id: 'p6', name: 'Bộ Đất Nặn Nhiều Màu', symbol: '🧁', matchTarget: 'Hình Con Vật Đất Sét', targetSymbol: '🐥', hint: 'Bé dùng tay nhào nặn đất sét thành những chú gà con đáng yêu!' }
    ]
  },

  // 24. GAME ĐỐ VUI: KỸ NĂNG VỆ SINH CÁ NHÂN & RỬA TAY 6 BƯỚC
  {
    id: 'game_ve_sinh_ca_nhan',
    title: 'Bé Giữ Vệ Sinh Cá Nhân Sạch Sẽ',
    icon: '🧼',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé học rửa tay xà phòng trước khi ăn, đánh răng ngày 2 lần và giữ đôi tay luôn thơm tho!',
    badgeTheme: 'cyan',
    interactiveQuestions: [
      {
        question: 'Trước khi ăn cơm hoặc sau khi đi vệ sinh, bé cần làm gì sạch sẽ?',
        options: ['Rửa Tay Bằng Xà Phòng', 'Lau Tay Vào Quần', 'Ăn Luôn Không Cần Rửa'],
        optionEmojis: ['🧼', '👖', '🍚'],
        correctAnswer: 'Rửa Tay Bằng Xà Phòng',
        timeLimit: 20,
        hint: 'Rửa tay sạch xà phòng diệt sạch vi khuẩn cho bụng bé khỏe mạnh nè!',
        soundType: 'bell',
        emoji: '🧼'
      },
      {
        question: 'Mỗi ngày bé nên đánh răng mấy lần để có nụ cười trắng sáng thơm tho?',
        options: ['2 Lần (Sáng & Tối)', 'Không Cần Đánh Răng', 'Chỉ Đánh 1 Lần Trong Tuần'],
        optionEmojis: ['🪥', '❌', '📅'],
        correctAnswer: '2 Lần (Sáng & Tối)',
        timeLimit: 20,
        hint: 'Đánh răng sáng sau khi thức dậy và tối trước khi đi ngủ nha con!',
        soundType: 'bell',
        emoji: '🦷'
      },
      {
        question: 'Dụng cụ nào giúp bé làm sạch răng mỗi buổi sáng thức dậy?',
        options: ['Bàn Chải & Kem Đánh Răng', 'Cây Chổi Quét Nhà', 'Chiếc Muỗng Ăn Cơm'],
        optionEmojis: ['🪥', '🧹', '🥄'],
        correctAnswer: 'Bàn Chải & Kem Đánh Răng',
        timeLimit: 20,
        hint: 'Bàn chải lông mềm chải sạch từng kẽ răng xinh xắn!',
        soundType: 'bell',
        emoji: '🪥'
      },
      {
        question: 'Khi ho hoặc hắt xì hơi, bé dùng vật gì để che miệng lịch sự?',
        options: ['Khăn Giấy Hoặc Khuỷu Tay', 'Hắt Vào Mặt Bạn', 'Không Che Miệng'],
        optionEmojis: ['🤧', '🤦', '💨'],
        correctAnswer: 'Khăn Giấy Hoặc Khuỷu Tay',
        timeLimit: 20,
        hint: 'Che miệng bằng khăn giấy hoặc khuỷu tay bảo vệ sức khỏe cho mọi người nha!',
        soundType: 'bell',
        emoji: '🤧'
      },
      {
        question: 'Móng tay móng chân dài có nhiều đất bẩn, bé cần nhờ ai cắt tỉa gọn gàng?',
        options: ['Nhờ Bố Mẹ Cắt Giúp', 'Tự Lấy Răng Cắn Móng', 'Để Móng Thật Dài'],
        optionEmojis: ['👨‍👩‍👧', '😬', '💅'],
        correctAnswer: 'Nhờ Bố Mẹ Cắt Giúp',
        timeLimit: 20,
        hint: 'Bố mẹ dùng bấm móng tay tỉa sạch sẽ cho đôi tay bé xinh!',
        soundType: 'bell',
        emoji: '✂️'
      },
      {
        question: 'Khi tắm gội xong, bé dùng vật gì êm mềm để lau khô người?',
        options: ['Khăn Tắm Bông Êm', 'Tấm Bạt Nhựa', 'Tờ Giấy Báo'],
        optionEmojis: ['🧖', '🧱', '📰'],
        correctAnswer: 'Khăn Tắm Bông Êm',
        timeLimit: 20,
        hint: 'Khăn bông êm ái thấm nước giúp bé không bị lạnh nè!',
        soundType: 'bell',
        emoji: '🧖'
      },
      {
        question: 'Quy trình rửa tay chuẩn của Bộ Y tế gồm có mấy bước sạch bong?',
        options: ['6 Bước Chuẩn Sạch', '1 Bước Nhanh', '10 Bước'],
        optionEmojis: ['🖐️', '☝️', '🔟'],
        correctAnswer: '6 Bước Chuẩn Sạch',
        timeLimit: 20,
        hint: '6 bước chà lòng bàn tay, mu bàn tay, kẽ ngón tay thật sạch vi khuẩn!',
        soundType: 'bell',
        emoji: '💦'
      },
      {
        question: 'Quần áo đi học hoặc đi chơi bị lấm lem bùn đất, bé nên làm gì?',
        options: ['Thay Ra Bỏ Vào Chậu Giặt', 'Mặc Luôn Đi Ngủ', 'Cất Vào Tủ'],
        optionEmojis: ['🧺', '🛏️', '🚪'],
        correctAnswer: 'Thay Ra Bỏ Vào Chậu Giặt',
        timeLimit: 20,
        hint: 'Bỏ quần áo bẩn vào chậu để mẹ giặt thơm phức nha con!',
        soundType: 'bell',
        emoji: '👕'
      },
      {
        question: 'Đôi dép đi trong nhà giúp bảo vệ lòng bàn chân bé như thế nào?',
        options: ['Chân Ấm Áp & Sạch Sẽ', 'Làm Chân Bị Ướt', 'Cho Chân Đi Đau'],
        optionEmojis: ['🩴', '🌊', '🩹'],
        correctAnswer: 'Chân Ấm Áp & Sạch Sẽ',
        timeLimit: 20,
        hint: 'Đi dép êm giúp chân bé ấm và tránh giẫm phải vật nhọn nè!',
        soundType: 'bell',
        emoji: '🩴'
      },
      {
        question: 'Uống đủ nước ấm lọc sạch mỗi ngày giúp cơ thể bé ra sao?',
        options: ['Khỏe Mạnh & Da Dẻ Hồng Hào', 'Bị Đau Bụng', 'Hay Bị Ốm'],
        optionEmojis: ['💪', '🤢', '🤒'],
        correctAnswer: 'Khỏe Mạnh & Da Dẻ Hồng Hào',
        timeLimit: 20,
        hint: 'Nước lọc thanh lọc cơ thể cho bé năng động học giỏi!',
        soundType: 'bell',
        emoji: '🥤'
      }
    ]
  },

  // 25. GAME ĐỐ VUI: KHOA HỌC THỜI TIẾT & BỐN MÙA
  {
    id: 'game_khoa_hoc_bon_mua',
    title: 'Khám Phá Bốn Mùa & Thời Tiết',
    icon: '🌦️',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé nhận biết Mùa Xuân hoa đào nở, Mùa Hè tắm biển, Mùa Thu rước đèn và Mùa Đông mặc áo ấm!',
    badgeTheme: 'rose',
    interactiveQuestions: [
      {
        question: 'Mùa nào hoa đào hoa mai nở rộ, các bé được mặc áo mới nhận lì xì?',
        options: ['Mùa Xuân Vui Tươi', 'Mùa Đông Lạnh', 'Mùa Thu'],
        optionEmojis: ['🌸', '❄️', '🍂'],
        correctAnswer: 'Mùa Xuân Vui Tươi',
        timeLimit: 20,
        hint: 'Mùa xuân đón Tết cổ truyền đoàn tụ bên gia đình!',
        soundType: 'star',
        emoji: '🌸'
      },
      {
        question: 'Khi trời mưa rơi lộp độp, bé đi ra ngoài cần mang theo vật dụng gì?',
        options: ['Chiếc Ô Xinh Hoặc Áo Mưa', 'Cây Quạt Giấy', 'Kính Râm Đen'],
        optionEmojis: ['☂️', '🪭', '🕶️'],
        correctAnswer: 'Chiếc Ô Xinh Hoặc Áo Mưa',
        timeLimit: 20,
        hint: 'Che ô hoặc mặc áo mưa để bé không bị ướt áo lạnh cảm nha!',
        soundType: 'bell',
        emoji: '☔'
      },
      {
        question: 'Mùa hè trời nắng nóng rực rỡ, bé cùng gia đình hay đi nghỉ mát ở đâu?',
        options: ['Bãi Biển Xanh Mát', 'Lên Ngọn Cây', 'Ngồi Trong Hang Tối'],
        optionEmojis: ['🏖️', '🌴', '🦇'],
        correctAnswer: 'Bãi Biển Xanh Mát',
        timeLimit: 20,
        hint: 'Đi tắm biển và xây lâu đài cát vui ơi là vui nè!',
        soundType: 'bell',
        emoji: '🏖️'
      },
      {
        question: 'Đêm Tết Trung Thu vào mùa thu, các bé rước đèn gì lung linh dưới ánh trăng?',
        options: ['Đèn Ông Sao 5 Cánh', 'Đèn Pin Sáng', 'Bóng Đèn Bàn'],
        optionEmojis: ['🏮', '🔦', '💡'],
        correctAnswer: 'Đèn Ông Sao 5 Cánh',
        timeLimit: 20,
        hint: 'Chiếc đèn ông sao màu đỏ rực rỡ hát vang tùng rinh rinh!',
        soundType: 'bell',
        emoji: '🏮'
      },
      {
        question: 'Khi mùa đông gió lạnh thổi về, bé mặc trang phục gì để giữ ấm cổ và ngực?',
        options: ['Áo Khoác Ấm & Khăn Len', 'Áo Ba Lỗ Ngắn', 'Quần Bơi'],
        optionEmojis: ['🧥', '🎽', '🩳'],
        correctAnswer: 'Áo Khoác Ấm & Khăn Len',
        timeLimit: 20,
        hint: 'Mặc áo ấm và quàng khăn len bảo vệ cổ họng bé không bị ho nè!',
        soundType: 'bell',
        emoji: '🧣'
      },
      {
        question: 'Ông Mặt Trời chiếu ánh nắng ấm áp giúp cây cối và hoa lá như thế nào?',
        options: ['Xanh Tươi Phát Triển', 'Bị Héo Khô Rụng', 'Biến Mất'],
        optionEmojis: ['🌻', '🥀', '💨'],
        correctAnswer: 'Xanh Tươi Phát Triển',
        timeLimit: 20,
        hint: 'Ánh nắng mặt trời cung cấp vitamin D cho bé và quang hợp cho cây!',
        soundType: 'star',
        emoji: '☀️'
      },
      {
        question: 'Hiện tượng gì xuất hiện trên bầu trời sau cơn mưa với 7 sắc màu rực rỡ?',
        options: ['Cầu Vồng Lấp Lánh', 'Đám Mây Đen', 'Khói Độc'],
        optionEmojis: ['🌈', '☁️', '🌫️'],
        correctAnswer: 'Cầu Vồng Lấp Lánh',
        timeLimit: 20,
        hint: 'Cầu vồng bắc ngang chân trời đẹp như tranh vẽ nha con!',
        soundType: 'star',
        emoji: '🌈'
      },
      {
        question: 'Lá cây chuyển sang màu vàng đỏ và rụng nhiều vào mùa nào trong năm?',
        options: ['Mùa Thu Êm Đềm', 'Mùa Hè', 'Mùa Xuân'],
        optionEmojis: ['🍁', '🌴', '🌱'],
        correctAnswer: 'Mùa Thu Êm Đềm',
        timeLimit: 20,
        hint: 'Gió thu heo may làm lá vàng bay xào xạc trên sân trường!',
        soundType: 'bell',
        emoji: '🍁'
      },
      {
        question: 'Ban đêm trên bầu trời trong vắt, bé ngắm nhìn thấy gì tỏa sáng dịu hiền?',
        options: ['Mặt Trăng & Ngôi Sao', 'Ông Mặt Trời', 'Đèn Giao Thông'],
        optionEmojis: ['🌙', '☀️', '🚦'],
        correctAnswer: 'Mặt Trăng & Ngôi Sao',
        timeLimit: 20,
        hint: 'Chị Hằng Nga và Chú Cuội ngồi bên gốc đa trên Cung Trăng nè!',
        soundType: 'star',
        emoji: '🌕'
      },
      {
        question: 'Khi trời nắng gắt giữa trưa, bé đi ra sân trường cần đội mũ gì?',
        options: ['Mũ Nón Rộng Vành', 'Đầu Trần Không Đội Mũ', 'Đeo Kính Bơi'],
        optionEmojis: ['🧢', '👦', '🥽'],
        correctAnswer: 'Mũ Nón Rộng Vành',
        timeLimit: 20,
        hint: 'Đội mũ che nắng bảo vệ đầu bé không bị say nắng nha!',
        soundType: 'bell',
        emoji: '👒'
      }
    ]
  },

  // 26. GAME GHÉP HÌNH: ĐỘNG VẬT BIỂN & THỦY CUNG DIỆU KỲ
  {
    id: 'game_ghephinh_sinh_vat_bien',
    title: 'Ghép Hình Sinh Vật Biển Thủy Cung',
    icon: '🐬',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Khám phá thế giới đại dương bao la: Cá heo nhảy múa, chú rùa biển bơi lội, sao biển 5 cánh!',
    badgeTheme: 'cyan',
    puzzlePairs: [
      { id: 'p1', name: 'Bạn Cá Heo Thông Minh', symbol: '🐬', matchTarget: 'Vòng Tròn Xiếc Biển', targetSymbol: '⭕', hint: 'Cá heo thông minh nhảy qua vòng tròn reo vui chào các bé!' },
      { id: 'p2', name: 'Bác Rùa Biển Hiền Từ', symbol: '🐢', matchTarget: 'Rạn San Hô Đầy Màu Sắc', targetSymbol: '🪸', hint: 'Bác rùa bơi chậm rãi qua những rạn san hô xinh đẹp!' },
      { id: 'p3', name: 'Bé Bạch Tuộc 8 Râu', symbol: '🐙', matchTarget: 'Vỏ Ốc Biển Long Lanh', targetSymbol: '🐚', hint: 'Bạch tuộc tinh nghịch uốn lượn 8 chiếc xúc tu mềm mại!' },
      { id: 'p4', name: 'Chú Cua Biển Ngang Tàng', symbol: '🦀', matchTarget: 'Bãi Cát Vàng Mịn', targetSymbol: '🏖️', hint: 'Cua có hai chiếc càng to bò ngang thoăn thoắt trên bãi cát!' },
      { id: 'p5', name: 'Sao Biển 5 Cánh Xinh', symbol: '⭐', matchTarget: 'Đáy Đại Dương Xanh', targetSymbol: '🌊', hint: 'Sao biển nằm nghỉ ngơi dưới làn nước trong vắt mát rượi!' },
      { id: 'p6', name: 'Cá Voi Khổng Lồ', symbol: '🐳', matchTarget: 'Cột Nước Phun Lên Trời', targetSymbol: '⛲', hint: 'Cá voi bơi lội thở phun cột nước cao vút lên bầu trời xanh!' }
    ]
  }
];
