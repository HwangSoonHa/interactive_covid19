(() =>{

    const actions = {
        birdFlies(key){
            if(key){
                document.querySelector('[data-index="2"] .bird').style.transform=`translateX(${window.innerWidth}px)`;
            }
            else {
                document.querySelector('[data-index="2"] .bird').style.transform=`translateX(-100%)`;
            }
        },
        birdFlies2(key){
            if(key)
                document.querySelector('[data-index="5"] .bird').style.transform=`translate(${window.innerWidth}px, -${window.innerHeight*0.7}px)`;
            else 
                document.querySelector('[data-index="5"] .bird').style.transform=`translateX(-100%)`;
        }

    }

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentItem = graphicElems[0] ; // 현재 활성화된 visible 클래스가 붙은 .graphic-item을 지정
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index;
    });

    for(let i=0; i<stepElems.length; i++){
        io.observe(stepElems[i]);
        stepElems[i].setAttribute('data-index', i);
        graphicElems[i].setAttribute('data-index', i);
    }

    function activate(action){
        currentItem.classList.add('visible');
        if(action){
            actions[action](true);
        }
    }

    function inactivate(action){
        currentItem.classList.remove('visible');
        if(action){
            actions[action](false);
        }
    }

    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
        for(let i=ioIndex-1; i<ioIndex+2; i++){
            step = stepElems[i];

            if(!step){
                continue;
            }
            boundingRect = step.getBoundingClientRect(); // 크기 위치 알아볼 수 있음.

            if(boundingRect.top > window.innerHeight*0.1 && boundingRect.top < window.innerHeight*0.8){
                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            } 
        }
    });

    window.addEventListener('load', () => {  //새로고침했을때 스크롤을 제일 위로 올려주는 것.
        setTimeout(() => scrollTo(0, 0), 100);
    });

    activate();

})();
