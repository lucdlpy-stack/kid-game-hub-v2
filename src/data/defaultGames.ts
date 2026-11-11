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
      }
    ]
  }
];
