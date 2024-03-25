const text1 = document.querySelector(".text1");
const text2 = document.querySelector(".text2");
const home_img = document.querySelector(".home_img");
const h2 = document.querySelectorAll("h2");
const n1 = document.querySelector(".n1");
const n2 = document.querySelector(".n2");
const n3 = document.querySelector(".n3");
const n4 = document.querySelector(".n4");
const n5 = document.querySelector(".n5");
const n6 = document.querySelector(".n6");
const arrow = document.querySelector("#arrow-up");

const tabListItems = document.querySelectorAll('.tab_list'); // 2번째 section의 6개의 선택하는 버튼(이미지)들의 공통 클래스이름
const panelItems = document.querySelectorAll('.panel_list'); // 위의 버튼(이미지)선택시 보여줄 6개의 이미지

// aos-animate : 미리 애니메이션효과를 준 클래스 이름
text1.classList.add("aos-animate");
text2.classList.add("aos-animate");
home_img.classList.add("aos-animate");
h2[2].classList.add("aos-animate");
tabListItems[0].classList.add('active');

scrollEvent();
/*
지정한 요소에 마우스 진입시 (자식 요소 해당안됨)
CSS처리한(색상변경&이미지변경&애니메이션효과) 클래스 이름을 추가 -> 그 외의 6개 이미지 클래스 이름 삭제
*/
mouseenterEvent();

function mouseenterEvent(){
tabListItems.forEach((item,i) => {
item.addEventListener('mouseenter', () => {
    tabListItems.forEach((tabItem,i) => {
        tabItem.classList.remove('active');
        panelItems[i].classList.remove("active");
    });
    item.classList.add('active');
    panelItems[i].classList.add("active");
});
});
}

function scrollEvent(){
    window.onscroll = function() {
      const currentScroll = window.scrollY;

      switch(true) {
          case  currentScroll < 265: //맨 위 상단
            text1.classList.add("aos-animate");
            text2.classList.add("aos-animate");
            home_img.classList.add("aos-animate");
            arrow.classList.add("arrow-up-hide");
            break;
            
            case currentScroll >= 265 && currentScroll < 510: //주요특징
            h2[1].classList.add("aos-animate")
              text1.classList.remove("aos-animate");
              text2.classList.remove("aos-animate");
              home_img.classList.remove("aos-animate");
              panelItems[0].classList.add("active");
              arrow.classList.add("arrow-up-hide");
            break;

            
          case currentScroll >= 510 && currentScroll < 630:
              
              arrow.classList.remove("arrow-up-hide");
              n1.classList.add("aos-animate");
              n4.classList.add("aos-animate");
            break;
          case currentScroll >= 630 && currentScroll < 785:
              n2.classList.add("aos-animate");
              n5.classList.add("aos-animate");
              arrow.classList.remove("arrow-up-hide");
            break;
          case currentScroll >= 785 && currentScroll < 1045 :
              n3.classList.add("aos-animate");
              n6.classList.add("aos-animate");
              arrow.classList.remove("arrow-up-hide");
            break;
          case currentScroll >= 1149 && currentScroll < 1300 :
              h2[2].classList.add("aos-animate");
              arrow.classList.remove("arrow-up-hide");
              
            break;
          case currentScroll > 260 && arrow.classList == "arrow-up-hide"  : 
          arrow.classList.remove("arrow-up-hide");
          break;
        }
    };
}