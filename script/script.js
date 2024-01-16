// product_page 안 swiper
const bestSwiper = new Swiper('.products_slide .swiper', {
    direction: 'horizontal', //세로 움직임 vertical, 가로 움직임 horizontal
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true, //버튼 클릭 여부
        type: 'fraction', //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    spaceBetween:10, //=>swiper-slide 사이 공백값
    slidesPerView:"auto",// =>css에 지정한 슬라이더의 크기를 사용함
    // =>이값을 지정하지 않으면 기존의 값으로 지정됨
    // centeredSlides:true, //=>슬라이더 번호에 맞는 객체의 가로 중앙 정렬
    autoplay:{
        //=>자동재생 명령
        delete:700,
        disableOnInteraction:true
    },
});
// 헤더 자식 요소 hover => 헤더 배경색 변경
const topMenuWrap = document.querySelector('.top_menu_wrap');
const header = document.querySelector('header');

  topMenuWrap.addEventListener('mouseover', () => {
      header.style.backgroundColor = '#ffffff'; // 호버 시 배경색 변경
  });

  topMenuWrap.addEventListener('mouseout', () => {
      header.style.backgroundColor = 'rgba(255,255,255,0.2)'; // 호버 해제 시 다시 원래 배경색으로 변경

  });

// 헤더 안 검색버튼 클릭=> 헤더 아래로 검색창 토글, 검색버튼 스타일 변경
let searchNum = 0;

function searchBox() {
    const searchBg = document.querySelector(".search_bg");
    const headerSrhBtn = document.querySelector(".header_tool_box button");
    const headerBg = ['','#ffffff']

    searchNum = 1 - searchNum; // 0 <=> 1 토글용 변수

    searchBg.style.opacity = searchNum;
    searchBg.style.visibility = searchNum ? 'visible' : 'hidden';
    headerSrhBtn.classList.remove(searchNum ? "btn_nomal" : "btn_on");
    headerSrhBtn.classList.add(searchNum ? "btn_on" : "btn_nomal");
    header.style.backgroundColor = headerBg[searchNum];
}

// 추천검색어 클릭하면 inputText 창에 입력되게 하기
function tagSearch(tag){
    const searchInput = document.querySelector("#searchTxt");
    searchInput.value = tag;
}

// 모달 배경(블러) 높이 지정
// wrap크기 저장해서 가져오기
const wrapHeight = document.querySelector(".wrap").offsetHeight;
const modalWin = document.querySelector(".modalWin");
const modalBg = document.querySelector(".modalBg");

modalWin.style.height = `${wrapHeight}px`;
modalBg.style.height = `${wrapHeight}px`;

// 마이페이지 클릭하면 모달 창 열기
const myPage = document.querySelector(".myPage");
myPage.addEventListener('click',modalOpen);
let myPageNum = 0;

function modalOpen() {
    const madalArr = ["hidden","visible"]
    myPageNum = 1 - myPageNum;
    modalWin.style.visibility = madalArr[myPageNum];
}

// 모달 창 안 닫기 버튼
const modalClose = document.querySelector(".modalClose");
modalClose.addEventListener('click',modalOpen);

// 모달 블러 배경 눌렀을 때 닫히게 하기
modalBg.addEventListener('click',modalOpen);

// 탭/모바일 숨김메뉴 토글
const hideMenuBut = document.querySelector(".hideMenuBut");
const hideMenu = document.querySelector(".mo_top_menu_wrap");
const moMenus = document.querySelectorAll(".mo_top_menu_wrap li")
let hideMenuNum = 0;

hideMenuBut.addEventListener('click',hideMenuToggle);

function hideMenuToggle(){
    const hideMenuArr = ["hidden","visible"]
    hideMenuNum = 1 - hideMenuNum;
    hideMenu.style.visibility = hideMenuArr[hideMenuNum];

    // hideMenu가 visible이 되면 moMenus에 mainMinTxtMove 애니메이션 실행
    moMenus.forEach(menu => {
        menu.style.animation = hideMenu.style.visibility === "hidden" ? "none" : "mainMinTxtMove 1s";
    });
}

// 스크롤이벤트 ==============================================================
// 1. 배경 어두운 페이지에서 헤더 색상 변경
const servicePage = document.querySelector(".service_page");
const reservistPage = document.querySelector(".reservist_page");

const headerObserver = new IntersectionObserver((items) => {
    items.forEach((item) => {
        if(item.isIntersecting) {
            header.style.color = '#ffffff';
        }else {
            header.style.color = '#000000';
        }
    })
},{
    threshold : 0.3
});

headerObserver.observe(servicePage);
headerObserver.observe(reservistPage);
// 1. 배경 어두운 페이지에서 헤더 색상 변경 끝

// 2. 페이지 로딩 애니메이션
// 2-1) 메인페이지 텍스트 애니메이션
const mainTxt = document.querySelectorAll(".main_txt");

const mainTextObserver = new IntersectionObserver(
    (texts) => {
        texts.forEach((txt) => {
            if(txt.isIntersecting) {
                txt.target.classList.add("main_txt_animation");
            } else {
                txt.target.classList.remove("main_txt_animation");
            }
        });

    }
);
mainTextObserver.observe(mainTxt[0])
mainTextObserver.observe(mainTxt[1])
// -----------------------------------/
const mainTxtMin = document.querySelector(".main_txt_min");

const mainTextMinObserver = new IntersectionObserver(
    (textMin) => {
        textMin.forEach((txtMin) => {
            if(txtMin.isIntersecting) {
                txtMin.target.classList.add("main_txt_min_animation");
            } else {
                txtMin.target.classList.remove("main_txt_min_animation");
            }
        });
    }
);
mainTextMinObserver.observe(mainTxtMin)

// 2-2) 최신소식 컨텐츠 감지되면 올라오면서 커지기
const latestNewsBox = document.querySelectorAll(".latest_news_box");

const swiperObserver = new IntersectionObserver(
    (latestNews) => {
        latestNews.forEach((News) => {
            if (News.isIntersecting) {
                News.target.classList.add("visible");
            }else {
                News.target.classList.remove("visible");
            }
        });
    }
);

latestNewsBox.forEach((News) => swiperObserver.observe(News));
// 2-2) 끝

// 2-3) 플러스가 되는 소식 (오른쪽에서 중앙으로)
const plusNewsPage = document.querySelector(".plusNews_page");
const plusNewsBox = document.querySelector(".plus_news_box");

const plusNewsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                plusNewsBox.style.opacity = "1";
                plusNewsBox.style.transform = "translateX(0)";
            } else {
                plusNewsBox.style.opacity = "0";
                plusNewsBox.style.transform = "translateX(50%)";
            }
        });
    },{
        threshold: 0.5
    }
);

plusNewsObserver.observe(plusNewsPage);

//카카오톡 간편로그인 키
// 6cd02b933f46ff0d3e8cef4ec7c118d1
// window.Kakao.inti("6cd02b933f46ff0d3e8cef4ec7c118d1");

// function kakaoLogin() {
//     window.Kakao.Auth.login({
//         // 받아올 개인정보
//         scope:'profile_nickname, profile_image',
//         success: function(authObj) {
//             console.log(authObj);
//             window.Kakao.API.request({
//                 url:'/v2/user/me', //로그인 한 유저 정보 가져오기
//                 success: res => {
//                     const kakao_account = res.kakao_account;
//                     console.log(kakao_account);
//                 }
//             });
//         }
//     });
// }

// header hover => 폰트 색상 검은색으로 변경
header.addEventListener("mouseover", function() {
    header.style.color = '#000000';
});

header.addEventListener("mouseout", function() {
    header.style.color = '';
});

