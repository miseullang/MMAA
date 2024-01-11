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

// 헤더 안 검색버튼 클릭=> 헤더 아래로 검색창 토글, 검색버튼 스타일 변경
let searchNum = 0;

function searchBox() {
    const searchBg = document.querySelector(".search_bg");
    const headerSrhBtn = document.querySelector(".header_tool_box button");

    searchNum = 1 - searchNum; // 0 <=> 1 토글용 변수

    searchBg.style.opacity = searchNum;
    headerSrhBtn.classList.remove(searchNum ? "btn_nomal" : "btn_on");
    headerSrhBtn.classList.add(searchNum ? "btn_on" : "btn_nomal");
}


// 추천검색어 클릭하면 inputText 창에 입력되게 하기
function tagSearch(tag){
    const searchInput = document.querySelector("#searchTxt");
    searchInput.value = tag;
}

// 헤더 자식 요소 hover => 헤더 배경색 변경
const topMenuWrap = document.querySelector('.top_menu_wrap');
  const header = document.querySelector('header');

  topMenuWrap.addEventListener('mouseover', () => {
      header.style.backgroundColor = '#ffffff'; // 호버 시 배경색 변경
  });

  topMenuWrap.addEventListener('mouseout', () => {
      header.style.backgroundColor = 'rgba(255,255,255,0.2)'; // 호버 해제 시 다시 원래 배경색으로 변경

  });

// 스크롤이벤트 ==============================================================
const servicePage = document.querySelector(".service_page");
const reservistPage = document.querySelector(".reservist_page");

const observer = new IntersectionObserver((items) => {
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

observer.observe(servicePage);
observer.observe(reservistPage);



