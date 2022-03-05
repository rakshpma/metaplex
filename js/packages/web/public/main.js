gsap.registerPlugin(ScrollTrigger)
let cont = document.querySelector('body')

let mobileAndTabletCheck = () => {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
let locoScroll = null
let mobileDevice = mobileAndTabletCheck()
if (mobileDevice) {
    let nice = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${nice}px`);
    window.addEventListener("resize", function () {
        nice = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${nice}px`);
    }, false);
    document.querySelectorAll('[data-scroll]').forEach(el => {
        if (el.getAttribute("data-scroll-speed") == "-10") {
            el.setAttribute("data-scroll-speed", "-0")
        }
        if (el.getAttribute("data-scroll-speed") == "-1") {
            el.setAttribute("data-scroll-speed", "-0.1")
        }
        if (el.getAttribute("data-scroll-speed") == "2") {
            el.setAttribute("data-scroll-speed", "0.1")
        }
    })
    gsap.to('.wrap > div', {
        scrollTrigger: {
            trigger: ".intro2",
            start: "middle",
            scroller: cont,
            scrub: true,
        },
        xPercent: -30
    })

    gsap.to('video', {
        scrollTrigger: {
            trigger: '.intro',
            scrub: true,
            top: "",
        },
        yPercent: 50
    })

    document.querySelectorAll(".content-container > section").forEach((el, i) => {
        let ele = el.querySelector(".img")
        gsap.to(ele, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
                scroller: cont,
            },
            yPercent: -20
        })
    })
}
else {
    locoScroll = new LocomotiveScroll({
        el: cont,
        smooth: true,
        multiplier: 1.9,
        tablet: {
            breakpoint: 0,
            smooth: true,
        },
    })


    locoScroll.on("scroll", ScrollTrigger.update)
    ScrollTrigger.scrollerProxy(cont, {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: cont.style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

   

}

let nav = (val) => {
    if(val == 'team'){
        locoScroll.scrollTo(document.querySelector('#team'))
    }
    else if(val == 'home'){
        if(locoScroll != null){
            locoScroll.scrollTo(document.querySelector('.without'))
        }
        else{
            document.querySelector('.without').scrollIntoView({behavior: "smooth"})
        }
    }
}




gsap.to('.nav', {
    scrollTrigger: {
        trigger: "section.without",
        start: "middle",
        scroller: cont,
        scrub: true,
        markers: false,
    },
   /* background: 'black',*/
    background: '#0D0921',
    paddingTop: '5px',
    paddingBottom: '5px'
})


let navEle = document.querySelector('.mob-nav')
let lines = document.querySelectorAll('.burger > .nline')
let status = false
let burger = document.querySelector('.burger')
burger.addEventListener('click', () => {
    if (!status) {
        showNav()
        console.log('here')
    }
    else {
        hideNav()
    }
})

let showNav = () => {
    status = true
    gsap.to(lines[0], {
        top: 0,
        rotate: "45deg",
        duration: 0.1,
    })
    gsap.to(lines[1], {
        top: "90%",
        rotate: "-45deg",
        duration: 0.1,
        delay: -0.1
    })

    gsap.to(navEle, {
        clipPath: "ellipse(200% 110% at 50% 0%)",
        duration: 0.6,
        onComplete: () => {
            navEle.style.pointerEvents = "all"
        }
    })
}

let hideNav = () => {
    status = false
    gsap.to(lines[0], {
        top: "40%",
        rotation: 0,
        duration: 0.1
    })
    gsap.to(lines[1], {
        top: "80%",
        rotation: 0,
        duration: 0.1,
        delay: -0.1
    })

    gsap.to(navEle, {
        clipPath: "ellipse(0% 0% at 50% 0%)",
        delay: 0.1,
        duration: 0.6,
        onComplete: () => {
            navEle.style.pointerEvents = "none"
        }
    })
}

let links = document.querySelectorAll('.mob-nav > .links > button')

links.forEach(link => {
    link.addEventListener('click', hideNav)
})

gsap.to('.yeah > .left-line > .left-block', {
    scrollTrigger: {
        trigger: '.yeah',
        scrub: true,
        scroller: cont,
        start: "top top",
    },
    top: "90%"
})

gsap.to('.yeah > .right-line > .right-block', {
    scrollTrigger: {
        trigger: '.yeah',
        scrub: true,
        scroller: cont,
        start: "top top",
    },
    top: "60%"
})

document.querySelectorAll(".content-container > section").forEach((el, i) => {
    let ele = el.querySelector(".rot")
    gsap.set(ele, { yPercent: -50 })
    if (i % 2 == 0) {
        gsap.to(ele, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
                scroller: cont,
            },
            rotate: "-360deg"
        })
    }
    else {
        gsap.to(ele, {
            scrollTrigger: {
                trigger: el,
                scrub: true,
                scroller: cont,
            },
            rotate: "360deg"
        })
    }
})

ScrollTrigger.refresh();


