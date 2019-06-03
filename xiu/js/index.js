var mySwiper = new Swiper ('.swiper-container', {
    //direction: 'vertical',
    loop: true,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    
    // 如果需要滚动条
    scrollbar: '.swiper-scrollbar',
    
    autoplay: 2000,
	autoplayDisableOnInteraction: true,
	observer:true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents:true //修改swiper的父元素时，自动初始化swiper
})        