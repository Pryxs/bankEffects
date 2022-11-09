export default function intersection() {
    let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    aheadContainer.style.transform = "scaleX(1)";
                    ahead.style.transform = "translateX(0)";
                };
            })
        },{
            threshold: .5
        });

    let ahead = document.querySelector('.ahead');
    let aheadContainer = document.querySelector('.ahead-container');

    observer.observe(aheadContainer);
}