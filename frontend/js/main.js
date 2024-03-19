console.log("제발되라$$##@@");

document.addEventListener("DOMContentLoaded",function(){
    console.log("start")
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

    const tabListItems = document.querySelectorAll('.tab_list'); // Select all list 
    const panelItems = document.querySelectorAll('.panel_list'); // Select all list 

    text1.classList.add("aos-animate");
    text2.classList.add("aos-animate");
    home_img.classList.add("aos-animate");
    h2[2].classList.add("aos-animate");
    // h2.classList.add("aos-animate");
    // n1.classList.add("aos-animate");
    // n2.classList.add("aos-animate");   
    // n3.classList.add("aos-animate");
    // n4.classList.add("aos-animate");
    // n5.classList.add("aos-animate");
    // n6.classList.add("aos-animate");
    
    window.onscroll = function() {
        const currentScroll = window.scrollY;
        console.log(currentScroll);
        switch(true) {
            case  currentScroll < 265: //맨 위 상단
              text1.classList.add("aos-animate");
              text2.classList.add("aos-animate");
              home_img.classList.add("aos-animate");
              break;

            case currentScroll >= 265 && currentScroll < 510: //주요특징
                h2[1].classList.add("aos-animate")
                text1.classList.remove("aos-animate");
                text2.classList.remove("aos-animate");
                home_img.classList.remove("aos-animate");
                panelItems[0].classList.add("active");
              break;

              
            case currentScroll >= 510 && currentScroll < 630:
                
                n1.classList.add("aos-animate");
                n4.classList.add("aos-animate");
              break;
            case currentScroll >= 630 && currentScroll < 785:
                n2.classList.add("aos-animate");
                n5.classList.add("aos-animate");
              break;
            case currentScroll >= 785 && currentScroll < 1045 :
                n3.classList.add("aos-animate");
                n6.classList.add("aos-animate");
              break;
            case currentScroll >= 1149 && currentScroll < 1300 :
                h2[2].classList.add("aos-animate");
              break;



          }
      };
     
     tabListItems[0].classList.add('active');

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

      
       
});