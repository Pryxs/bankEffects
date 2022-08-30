
var timeline;
var loaderTimeline;
const svg = document.getElementById("svg");
const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

function timelineIsInit() {
    return new Promise(resolve => {
        timeline = gsap.timeline();
        loaderTimeline = gsap.timeline();
        resolve(true);
    });
}

async function plugEvent() {
    // on attend que la timeline soit set
    await timelineIsInit();
    timeline.from(".loader_heading", {
        delay: 0,
        y: 100,
        opacity: 0,
    })

    loaderTimeline.to(".loader_heading_item", {
        opacity: 0,
        duration: 1.5,
        stagger: { each: .3, repeat: -1, repeatDelay: .8 },
        ease: "sine.inOut",
    },
        "-=2.2"
    );

    // quand la page est chargé on fini l'animation
    window.onload = (event) => {
        timeline.to(".loader_heading", {
            delay: 3,
            y: -200,
            opacity: 0,
        });

        timeline.to(svg, {
            delay: -.5,
            duration: 0.8,
            attr: { d: curve },
            ease: "power2.easeIn",
        }).to(svg, {
            duration: 0.4,
            attr: { d: flat },
            ease: "power2.easeOut",
        });

        timeline.from(".title", {
            y: 150,
            opacity: 0,
            ease: "power2.easeIn",
        },
            "-=.3"
        );
        
    };
}

plugEvent();

