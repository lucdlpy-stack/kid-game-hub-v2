import { Game } from '../types/game';

export const DEFAULT_GAMES: Game[] = [
  // 1. GAME ĐỐ VUI: ĐỘNG VẬT VUI NHỘN (Quiz)
  {
    id: 'game_dong_vat_vui_nhon',
    title: 'Thế Giới Động Vật Vui Nhộn',
    icon: '🦁',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Bé lắng nghe âm thanh và đoán tên các con vật đáng yêu xung quanh bé!',
    badgeTheme: 'amber',
    interactiveQuestions: [
      {
        question: 'Con gì kêu "Gâu gâu", thích gặm xương và giữ nhà cho bé?',
        options: ['Chú Chó Con', 'Chú Mèo Con', 'Chú Gà Trống'],
        correctAnswer: 'Chú Chó Con',
        timeLimit: 20,
        hint: 'Bạn này rất trung thành và hay vẫy đuôi mừng bé!',
        soundType: 'dog',
        emoji: '🐶'
      },
      {
        question: 'Con vật nào có chiếc vòi thật dài và hai tai to như cái quạt?',
        options: ['Chú Voi Con', 'Hươu Cao Cổ', 'Chú Sư Tử'],
        correctAnswer: 'Chú Voi Con',
        timeLimit: 20,
        hint: 'Chú voi thích hút nước bằng vòi phun mưa tắm mát!',
        soundType: 'lion',
        emoji: '🐘'
      },
      {
        question: 'Con gì kêu "Meo meo", thích ăn cá và giỏi bắt chuột?',
        options: ['Chú Mèo Con', 'Chú Thỏ Trắng', 'Bé Chuột Nhắt'],
        correctAnswer: 'Chú Mèo Con',
        timeLimit: 20,
        hint: 'Bạn ấy có ria mép dài và bộ lông rất êm mềm!',
        soundType: 'cat',
        emoji: '🐱'
      },
      {
        question: 'Bạn nào có đôi tai dài, thích ăn củ cà rốt đỏ cam và nhảy thoăn thoắt?',
        options: ['Chú Thỏ Trắng', 'Chú Gấu Nâu', 'Bác Rùa'],
        correctAnswer: 'Chú Thỏ Trắng',
        timeLimit: 20,
        hint: 'Bạn thỏ trắng có đôi mắt tròn xoe như hai hạt ngọc!',
        soundType: 'bell',
        emoji: '🐰'
      },
      {
        question: 'Con gì gáy "Ò ó o..." đánh thức bé dậy đi học mỗi sáng sớm?',
        options: ['Chú Gà Trống', 'Chú Vịt Bầu', 'Chim Bồ Câu'],
        correctAnswer: 'Chú Gà Trống',
        timeLimit: 20,
        hint: 'Chú có chiếc mào đỏ rực trên đầu thật oai vệ!',
        soundType: 'bird',
        emoji: '🐓'
      },
      {
        question: 'Con vật nào được mệnh danh là "Chúa sơn lâm" với chiếc bờm dũng mãnh?',
        options: ['Sư Tử Oai Hùng', 'Khỉ Tinh Nghịch', 'Sóc Nhỏ'],
        correctAnswer: 'Sư Tử Oai Hùng',
        timeLimit: 20,
        hint: 'Tiếng gầm của chú vang rền khắp thảo nguyên!',
        soundType: 'lion',
        emoji: '🦁'
      },
      {
        question: 'Con gì biết bơi lội dưới nước, kêu "Cạp cạp" tìm tôm cá?',
        options: ['Chú Vịt Vàng', 'Con Heo Mũm Mĩm', 'Bạn Cừu Trắng'],
        correctAnswer: 'Chú Vịt Vàng',
        timeLimit: 20,
        hint: 'Bạn vịt có đôi chân màng chèo bơi thoăn thoắt!',
        soundType: 'bell',
        emoji: '🦆'
      }
    ]
  },

  // 2. GAME GHÉP HÌNH: GHÉP ĐÔI VŨ TRỤ KỲ THÚ (Matching Puzzle)
  {
    id: 'game_ghephinh_vu_tru',
    title: 'Ghép Đôi Vũ Trụ Kỳ Thú',
    icon: '🚀',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé cùng khám phá dải ngân hà, tàu con thoi và những vì sao lung linh!',
    badgeTheme: 'indigo',
    puzzlePairs: [
      {
        id: 'p1',
        name: 'Phi Hành Gia',
        symbol: '👨‍🚀',
        matchTarget: 'Mặt Trăng Tròn',
        targetSymbol: '🌕',
        hint: 'Chú phi hành gia bay vào không gian để đặt chân lên Mặt Trăng!'
      },
      {
        id: 'p2',
        name: 'Tên Lửa Siêu Tốc',
        symbol: '🚀',
        matchTarget: 'Trạm Vũ Trụ Không Gian',
        targetSymbol: '🛰️',
        hint: 'Tên lửa bay vút lên bầu trời để cập bến trạm không gian!'
      },
      {
        id: 'p3',
        name: 'Kính Thiên Văn',
        symbol: '🔭',
        matchTarget: 'Ngôi Sao Lấp Lánh',
        targetSymbol: '⭐',
        hint: 'Bé dùng kính thiên văn ngắm nhìn các vì sao lung linh trên cao!'
      },
      {
        id: 'p4',
        name: 'Trái Đất Xanh Yêu Thương',
        symbol: '🌍',
        matchTarget: 'Mặt Trời Tỏa Nắng Ấm',
        targetSymbol: '☀️',
        hint: 'Hành tinh xanh của chúng ta quay quanh Ông Mặt Trời ấm áp!'
      },
      {
        id: 'p5',
        name: 'Vệ Tinh Nhân Tạo',
        symbol: '📡',
        matchTarget: 'Tín Hiệu Sóng Vũ Trụ',
        targetSymbol: '📶',
        hint: 'Vệ tinh bay trên quỹ đạo phát sóng truyền tin về Trái Đất!'
      },
      {
        id: 'p6',
        name: 'Sao Băng Rực Sáng',
        symbol: '🌠',
        matchTarget: 'Bầu Trời Đêm Đầy Sao',
        targetSymbol: '🌌',
        hint: 'Ngôi sao băng vụt sáng trên bầu trời đêm để bé ước mơ!'
      }
    ]
  },

  // 3. GAME ĐỐ VUI: XE CỘ & AN TOÀN GIAO THÔNG (Quiz)
  {
    id: 'game_xe_co_giao_thong',
    title: 'Bé Nhận Biết Xe Cộ & Giao Thông',
    icon: '🚗',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Cùng bé tìm hiểu xe cứu hỏa, xe cảnh sát, máy bay và đèn giao thông nhé!',
    badgeTheme: 'rose',
    interactiveQuestions: [
      {
        question: 'Xe gì màu đỏ tươi, có còi hụ vang và chở nước đi dập lửa?',
        options: ['Xe Cứu Hỏa', 'Xe Cứu Thương', 'Xe Buýt Lớn'],
        correctAnswer: 'Xe Cứu Hỏa',
        timeLimit: 20,
        hint: 'Các chú lính cứu hỏa dũng cảm luôn đi chiếc xe này!',
        soundType: 'car',
        emoji: '🚒'
      },
      {
        question: 'Phương tiện nào có hai cánh to, bay lượn trên bầu trời xanh cùng mây trắng?',
        options: ['Máy Bay', 'Tàu Hỏa', 'Thuyền Buồm'],
        correctAnswer: 'Máy Bay',
        timeLimit: 20,
        hint: 'Máy bay chở mọi người bay qua những đám mây!',
        soundType: 'bell',
        emoji: '✈️'
      },
      {
        question: 'Khi đi bộ sang đường gặp Đèn Giao Thông ĐỎ, bé phải làm gì?',
        options: ['Dừng Lại Chờ Đợi', 'Chạy Thật Nhanh', 'Băng Qua Ngay'],
        correctAnswer: 'Dừng Lại Chờ Đợi',
        timeLimit: 20,
        hint: 'Đèn đỏ báo hiệu dừng lại an toàn cho mọi người!',
        soundType: 'bell',
        emoji: '🚦'
      },
      {
        question: 'Xe gì có 2 bánh, có chuông reo "Kính coong" và bàn đạp cho bé đạp đi dạo?',
        options: ['Xe Đạp Xinh', 'Xe Ô Tô', 'Tàu Thủy'],
        correctAnswer: 'Xe Đạp Xinh',
        timeLimit: 20,
        hint: 'Bé nhớ đội mũ bảo hiểm khi tập đi xe đạp nhé!',
        soundType: 'bell',
        emoji: '🚲'
      },
      {
        question: 'Đoàn tàu gì dài thật dài, chạy xình xịch trên đường ray sắt?',
        options: ['Tàu Hỏa', 'Xe Tải Nặng', 'Xe Xích Lô'],
        correctAnswer: 'Tàu Hỏa',
        timeLimit: 20,
        hint: 'Đoàn tàu có nhiều toa nối đuôi nhau tu tu xình xịch!',
        soundType: 'bell',
        emoji: '🚂'
      },
      {
        question: 'Xe gì có còi hụ gấp gáp, chữ thập đỏ và đưa người bệnh đến bệnh viện cấp cứu?',
        options: ['Xe Cứu Thương', 'Xe Cẩu', 'Xe Rác'],
        correctAnswer: 'Xe Cứu Thương',
        timeLimit: 20,
        hint: 'Bác sĩ và y tá đi trên chiếc xe này để giúp đỡ bệnh nhân!',
        soundType: 'car',
        emoji: '🚑'
      }
    ]
  },

  // 4. GAME GHÉP HÌNH: THỨC ĂN CỦA MUÔNG THÚ (Matching Puzzle)
  {
    id: 'game_ghephinh_thuc_an_dong_vat',
    title: 'Ghép Thức Ăn Cho Muông Thú',
    icon: '🥕',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé hãy giúp các bạn động vật tìm đúng món ăn khoái khẩu của mình nào!',
    badgeTheme: 'emerald',
    puzzlePairs: [
      {
        id: 'p1',
        name: 'Bạn Thỏ Trắng',
        symbol: '🐰',
        matchTarget: 'Củ Cà Rốt Giòn Ngọt',
        targetSymbol: '🥕',
        hint: 'Củ màu cam tươi mọc dưới đất mà bạn thỏ rất mê!'
      },
      {
        id: 'p2',
        name: 'Chú Khỉ Nâu',
        symbol: '🐒',
        matchTarget: 'Nải Chuối Vàng Thơm',
        targetSymbol: '🍌',
        hint: 'Quả cong cong vỏ vàng thơm lừng chú khỉ thích chuyền cành hái ăn!'
      },
      {
        id: 'p3',
        name: 'Mèo Mướp Ngoan',
        symbol: '🐱',
        matchTarget: 'Đĩa Cá Tươi Ngon',
        targetSymbol: '🐟',
        hint: 'Mèo thích ăn cá rán giòn thơm phức!'
      },
      {
        id: 'p4',
        name: 'Cún Con Dễ Thương',
        symbol: '🐶',
        matchTarget: 'Khúc Xương Thơm Giòn',
        targetSymbol: '🦴',
        hint: 'Cún thích gặm khúc xương và vẫy đuôi mừng rỡ!'
      },
      {
        id: 'p5',
        name: 'Gấu Trúc Dễ Thương',
        symbol: '🐼',
        matchTarget: 'Cành Trúc Xanh Non',
        targetSymbol: '🎋',
        hint: 'Gấu trúc tròn xoe thích nhai lá và cành tre trúc xanh mướt!'
      },
      {
        id: 'p6',
        name: 'Cô Bò Sữa Chăm Chỉ',
        symbol: '🐮',
        matchTarget: 'Đồng Cỏ Xanh Tươi',
        targetSymbol: '🌿',
        hint: 'Bò sữa ăn cỏ xanh để cho các bé dòng sữa ngọt ngào!'
      }
    ]
  },

  // 5. GAME ĐỐ VUI: SẮC MÀU & HÌNH KHỐI (Quiz)
  {
    id: 'game_sac_mau_hinh_khoi',
    title: 'Sắc Màu & Hình Khối Thần Kỳ',
    icon: '🎨',
    ageGroup: '3-5 tuổi',
    gameType: 'quiz',
    description: 'Thử tài bé nhận biết màu sắc thiên nhiên, hình tròn, hình vuông và tam giác!',
    badgeTheme: 'cyan',
    interactiveQuestions: [
      {
        question: 'Quả dưa hấu khi bổ ra, bên trong ruột thường có màu gì ngọt ngào?',
        options: ['Màu Đỏ Tươi', 'Màu Xanh Biển', 'Màu Tím'],
        correctAnswer: 'Màu Đỏ Tươi',
        timeLimit: 20,
        hint: 'Màu đỏ giống như quả dâu tây và hoa phượng vĩ!',
        soundType: 'bell',
        emoji: '🍉'
      },
      {
        question: 'Mặt Trời chiếu sáng ban ngày trên cao có hình gì hả bé?',
        options: ['Hình Tròn', 'Hình Vuông', 'Hình Ngôi Sao'],
        correctAnswer: 'Hình Tròn',
        timeLimit: 20,
        hint: 'Tròn vo giống như quả bóng lăn trên sân cỏ!',
        soundType: 'star',
        emoji: '☀️'
      },
      {
        question: 'Lá cây non ngoài vườn vào mùa xuân thường có màu gì tươi mát?',
        options: ['Màu Xanh Lá Cây', 'Màu Nâu Đất', 'Màu Trắng Tinh'],
        correctAnswer: 'Màu Xanh Lá Cây',
        timeLimit: 20,
        hint: 'Màu của lá cây giúp thiên nhiên mát rượi!',
        soundType: 'bell',
        emoji: '🍃'
      },
      {
        question: 'Chiếc nón lá truyền thống của các cô giáo và bà có dáng hình gì?',
        options: ['Hình Tam Giác Nhọn', 'Hình Tròn Xoe', 'Hình Chữ Nhật'],
        correctAnswer: 'Hình Tam Giác Nhọn',
        timeLimit: 20,
        hint: 'Hình có 3 góc nhọn chóp nón che mưa che nắng!',
        soundType: 'bell',
        emoji: '👒'
      },
      {
        question: 'Chiếc bánh Chưng ngày Tết cổ truyền của dân tộc có hình gì vuông vắn?',
        options: ['Hình Vuông', 'Hình Bầu Dục', 'Hình Tròn'],
        correctAnswer: 'Hình Vuông',
        timeLimit: 20,
        hint: 'Bánh Chưng hình vuông tượng trưng cho Mặt Đất bao la!',
        soundType: 'bell',
        emoji: '🟩'
      },
      {
        question: 'Bầu trời lúc trời quang ban ngày hoặc biển khơi có màu gì?',
        options: ['Màu Xanh Da Trời', 'Màu Hồng Nhạt', 'Màu Đen'],
        correctAnswer: 'Màu Xanh Da Trời',
        timeLimit: 20,
        hint: 'Màu xanh êm dịu và bao la vô tận!',
        soundType: 'star',
        emoji: '🌊'
      }
    ]
  },

  // 6. GAME GHÉP HÌNH: BÉ GHÉP NGHỀ NGHIỆP & DỤNG CỤ (Matching Puzzle)
  {
    id: 'game_ghephinh_nghe_nghiep',
    title: 'Bé Ghép Nghề Nghiệp & Dụng Cụ',
    icon: '🩺',
    ageGroup: '3-5 tuổi',
    gameType: 'matching_puzzle',
    description: 'Bé tìm hiểu công việc của Bác sĩ, Cô giáo, Chú cứu hỏa và Đầu bếp nhé!',
    badgeTheme: 'purple',
    puzzlePairs: [
      {
        id: 'p1',
        name: 'Bác Sĩ Tận Tâm',
        symbol: '🩺',
        matchTarget: 'Bệnh Viện & Ống Nghe Y Tế',
        targetSymbol: '🏥',
        hint: 'Bác sĩ đeo ống nghe khám bệnh giúp các bé luôn khỏe mạnh!'
      },
      {
        id: 'p2',
        name: 'Chú Cứu Hỏa Quả Cảm',
        symbol: '🚒',
        matchTarget: 'Bình Cứu Hỏa & Vòi Phun Nước',
        targetSymbol: '🧯',
        hint: 'Dụng cụ giúp dập tắt đám lửa bảo vệ mọi người!'
      },
      {
        id: 'p3',
        name: 'Cô Giáo Mầm Non',
        symbol: '👩‍🏫',
        matchTarget: 'Sách Truyện & Bảng Đen',
        targetSymbol: '📚',
        hint: 'Cô giáo kể chuyện cổ tích và dạy bé hát những bài ca vui!'
      },
      {
        id: 'p4',
        name: 'Bác Đầu Bếp Tài Ba',
        symbol: '👨‍🍳',
        matchTarget: 'Chảo Chiên & Mũ Đầu Bếp',
        targetSymbol: '🍳',
        hint: 'Đầu bếp nấu những món ăn thơm ngon bổ dưỡng cho bé!'
      },
      {
        id: 'p5',
        name: 'Chú Cảnh Sát Giao Thông',
        symbol: '👮',
        matchTarget: 'Chiếc Còi & Xe Tuần Tra',
        targetSymbol: '🚓',
        hint: 'Chú thổi còi chỉ dẫn xe cộ đi đúng làn đường an toàn!'
      },
      {
        id: 'p6',
        name: 'Họa Sĩ Sáng Tạo',
        symbol: '🎨',
        matchTarget: 'Bảng Màu & Cây Cọ Vẽ',
        targetSymbol: '🖌️',
        hint: 'Họa sĩ cầm cọ vẽ nên những bức tranh cầu vồng rực rỡ!'
      }
    ]
  }
];
