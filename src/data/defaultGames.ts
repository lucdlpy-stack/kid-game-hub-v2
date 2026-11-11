import { Game } from '../types/game';

export const DEFAULT_GAMES: Game[] = [
  // === TRÒ CHƠI TÍCH HỢP TÍNH NĂNG CAMERA (TƯƠNG TÁC THỊ GIÁC, CHUYỂN ĐỘNG & BIẾN HÌNH) ===

  // 1. GAME CAMERA 1: BIẾN HÌNH NHÂN VẬT HOẠT HÌNH
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

  // 2. GAME CAMERA 2: BÉ BẮT BONG BÓNG & QUẢ NGỌT
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

  // 3. GAME CAMERA 3: GƯƠNG THẦN BIỂU CẢM & MẶT NẠ VUI NHỘN
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

  // 4. GAME CAMERA 4: VŨ ĐIỆU BẮT SAO VŨ TRỤ
  {
    id: 'game_camera_stars',
    title: 'Vũ Điệu Bắt Sao Vũ Trụ',
    icon: '⭐',
    ageGroup: '3-5 tuổi',
    gameType: 'camera_stars',
    description: 'Các ngôi sao băng lấp lánh đang rơi! Bé dùng 2 bàn tay hứng sao vào chiếc giỏ ma thuật cùng bạn Khủng Long Dino!',
    badgeTheme: 'indigo',
    bannerImage: '/src/assets/images/kid_camera_stars_1794370846892.jpg'
  },

  // === CÁC TRÒ CHƠI NĂNG ĐỘNG, BẮN CUNG, VƯỢT CHƯỚNG NGẠI VẬT & ĐUA XE ===

  // 5. GAME BẮN CUNG TÊN: BẮN CUNG TÊN QUẢ NGỌT & BONG BÓNG
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

  // 6. GAME VƯỢT CHƯỚNG NGẠI VẬT: CUỘC PHIÊU LƯU VƯỢT CHƯỚNG NGẠI VẬT
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

  // 7. GAME ĐUA XE: ĐUA XE THÚ CƯNG CẦU VỒNG
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

  // 8. GAME ÂM NHẠC: ĐÀN PHÍM MA THUẬT & ÂM THANH
  {
    id: 'game_music_piano',
    title: 'Đàn Phím Âm Nhạc & Muông Thú',
    icon: '🎹',
    ageGroup: '3-5 tuổi',
    gameType: 'music_piano',
    description: 'Bé gõ các phím đàn piano khổng lồ phát sáng và nghe tiếng kêu vui nhộn của chó, mèo, vịt, bò sữa!',
    badgeTheme: 'indigo'
  },

  // 9. GAME VẬN ĐỘNG: VÒNG QUAY VẬN ĐỘNG KHỎE VUI
  {
    id: 'game_action_wheel',
    title: 'Vòng Quay Vận Động Khỏe Vui',
    icon: '🎡',
    ageGroup: '3-5 tuổi',
    gameType: 'action_wheel',
    description: 'Bé quay bánh xe may mắn và cùng nhảy như thỏ, vỗ cánh như chim, vươn vai như gấu thật khỏe mạnh!',
    badgeTheme: 'cyan'
  },

  // === GHÉP HÌNH DỄ THƯƠNG (CUTE MATCHING PUZZLES) ===

  // 10. GAME GHÉP HÌNH: GHÉP ĐỒ CHƠI XINH YÊU
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

  // 11. GAME GHÉP HÌNH: VŨ TRỤ KỲ THÚ
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

  // 12. GAME GHÉP HÌNH: THỨC ĂN MUÔNG THÚ
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

  // 13. GAME GHÉP HÌNH: NGHỀ NGHIỆP & DỤNG CỤ
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

  // === QUIZ GAMES ===

  // 14. GAME ĐỐ VUI: ĐỘNG VẬT VUI NHỘN
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

  // 15. GAME ĐỐ VUI: XE CỘ & AN TOÀN GIAO THÔNG
  {
    id: 'game_xe_co_giao_thong',
    title: 'Bé Nhận Biết Xe Cộ & Giao Thông',
    icon: '🚗',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Hình ảnh xe cộ to rõ với còi hụ vui nhộn cho bé nhận biết an toàn giao thông!',
    badgeTheme: 'rose',
    interactiveQuestions: [
      {
        question: 'Xe gì màu đỏ tươi, có còi hụ vang và chở nước đi dập lửa?',
        options: ['Xe Cứu Hỏa', 'Xe Cứu Thương', 'Xe Buýt Lớn'],
        optionEmojis: ['🚒', '🚑', '🚌'],
        correctAnswer: 'Xe Cứu Hỏa',
        timeLimit: 20,
        hint: 'Các chú lính cứu hỏa dũng cảm luôn đi chiếc xe này!',
        soundType: 'car',
        emoji: '🚒'
      },
      {
        question: 'Phương tiện nào có hai cánh to, bay lượn trên bầu trời xanh cùng mây trắng?',
        options: ['Máy Bay', 'Tàu Hỏa', 'Thuyền Buồm'],
        optionEmojis: ['✈️', '🚂', '⛵'],
        correctAnswer: 'Máy Bay',
        timeLimit: 20,
        hint: 'Máy bay chở mọi người bay qua những đám mây!',
        soundType: 'bell',
        emoji: '✈️'
      },
      {
        question: 'Khi đi bộ sang đường gặp Đèn Giao Thông ĐỎ, bé phải làm gì?',
        options: ['Dừng Lại Chờ Đợi', 'Chạy Thật Nhanh', 'Băng Qua Ngay'],
        optionEmojis: ['🛑', '🏃', '🚶'],
        correctAnswer: 'Dừng Lại Chờ Đợi',
        timeLimit: 20,
        hint: 'Đèn đỏ báo hiệu dừng lại an toàn cho mọi người!',
        soundType: 'bell',
        emoji: '🚦'
      },
      {
        question: 'Xe gì có 2 bánh, có chuông reo "Kính coong" và bàn đạp cho bé đạp đi dạo?',
        options: ['Xe Đạp Xinh', 'Xe Ô Tô', 'Tàu Thủy'],
        optionEmojis: ['🚲', '🚗', '🚢'],
        correctAnswer: 'Xe Đạp Xinh',
        timeLimit: 20,
        hint: 'Bé nhớ đội mũ bảo hiểm khi tập đi xe đạp nhé!',
        soundType: 'bell',
        emoji: '🚲'
      },
      {
        question: 'Đoàn tàu gì dài thật dài, chạy xình xịch trên đường ray sắt?',
        options: ['Tàu Hỏa', 'Xe Tải Nặng', 'Xe Xích Lô'],
        optionEmojis: ['🚂', '🚛', '🛺'],
        correctAnswer: 'Tàu Hỏa',
        timeLimit: 20,
        hint: 'Đoàn tàu có nhiều toa nối đuôi nhau tu tu xình xịch!',
        soundType: 'bell',
        emoji: '🚂'
      },
      {
        question: 'Xe gì có còi hụ gấp gáp, chữ thập đỏ và đưa người bệnh đến bệnh viện cấp cứu?',
        options: ['Xe Cứu Thương', 'Xe Cẩu', 'Xe Rác'],
        optionEmojis: ['🚑', '🏗️', '🚛'],
        correctAnswer: 'Xe Cứu Thương',
        timeLimit: 20,
        hint: 'Bác sĩ và y tá đi trên chiếc xe này để giúp đỡ bệnh nhân!',
        soundType: 'car',
        emoji: '🚑'
      }
    ]
  },

  // 16. GAME ĐỐ VUI: SẮC MÀU & HÌNH KHỐI
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
