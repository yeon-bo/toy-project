// json 파일 뿌리기
const myAccountUrl =
  "https://gist.githubusercontent.com/himchan94/a539fd8c884477a314044e8b423b9653/raw/045a98969d43f50cacd168835d4b83b985658478/myAccount.json";
const gmAccountUrl =
  "https://gist.githubusercontent.com/himchan94/283d5837431bec8d5cb88a6e3525c35f/raw/12fda6b36c8dd6e29a9b878a236a363d4c85d561/grandmotherAccount.json";

const h1 = document.querySelector('header h1')
const accounNum = document.querySelector('.accoun-num')
const accounMoney = document.querySelector('.accoun-money strong')
const progress = document.querySelector('.progress')
const accountDesc = document.querySelector('.account-desc span')
const saveListH = document.querySelector('.save-list')
const saveProgress = document.querySelector('.save-progress')

fetch(myAccountUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    h1.textContent = data.accountName;
    accounNum.textContent = data.accountNumber;
    accounMoney.textContent = data.accountMoney.toLocaleString();
    progress.style.width = `${data.limit}/${data.totalSpend}%`;
    progress.style.backgroundColor = data.progressColor;
    const changes = data.limit - data.totalSpend;
    accountDesc.textContent = changes.toLocaleString();

    const saveBar = document.createElement('li');
    const saveProgress = document.createElement('div');
    const saveName = document.createElement('span');
    const saveMoney = document.createElement('span');
    for (i = 0; i < data.saveList.length; i++) {
      saveName.textContent = data.saveList[i].name;
      saveMoney.textContent = data.saveList[i].money;
      saveProgress.style.width = `${data.limit}/${data.saveList[i].target}%`;
      saveProgress.style.background = data.saveList[i].color;
      saveListH.appendChild(saveBar);
      saveBar.appendChild(saveProgress);
      saveBar.appendChild(saveName);
      saveBar.appendChild(saveMoney);
      saveBar.className = 'save-bar';
      saveProgress.className = 'save-progress';
      saveName.className = 'save-name';
      saveMoney.className = 'save-money';
    }
  });


window.onload = function () {
  // swiper 영역 이벤트
  const wrapper = document.querySelector('.wrapper');
  const swiper = document.querySelector('.swiper');
  const accoutAll = document.querySelectorAll('.accout');

  let startPos = 0;
  let offset = 0;
  let curPos = 0;
  const screenWidth = wrapper.clientWidth
  // 포인트 시작점
  wrapper.addEventListener('touchstart', (e) => {
    startPos = e.touches[0].pageX;
  });
  // 포인트가 움직임에 따라 같이 움직이기
  wrapper.addEventListener('touchmove', (e) => {
    offset = curPos + (e.targetTouches[0].pageX - startPos);
    swiper.style.transform = `translate3d(${offset}px, 0px, 0px)`
    swiper.style.transitionDuration = '0ms'
  });
  // 포인트가 화면의 반 이상 넘거가면 화면 넘겨주기
  wrapper.addEventListener('touchend', (e) => {
    const sum = curPos + (e.changedTouches[0].pageX - startPos);
    let destination = Math.round(sum / screenWidth) * screenWidth;
    // 화면의 위치가 처음 또는 마지막일때 유효한 화면으로 돌아가기
    if (destination > 0) {
      destination = 0
    } else if (destination < -(screenWidth * (accoutAll.length - 1))) {
      destination = -(screenWidth * (accoutAll.length - 1))
    }
    // 포인트 선택 화면이 처음으로 돌아가지 않게 현재 화면에 고정
    swiper.style.transform = `translate3d(${destination}px, 0px, 0px)`
    swiper.style.transitionDuration = '300ms'
    curPos = destination
  })


  // spand-section영역 마우스 이벤트 Up Down
  const spend = document.querySelector('.spend-section')
  const dragbar = document.querySelector('.dragbar')

  dragbar.addEventListener('click', spendUpDown)

  function spendUpDown() {
    if (spend.style.top === '') {
      spend.style.top = '-254px'
    } else {
      spend.style.top = ''
    }
  };

  // save-list영역 마우스 이벤트
  const saveCont = document.querySelector('.save-cont')
  const saveContCont = document.querySelector('.save-contcont')
  const dayList = document.querySelectorAll('.day-list')

  let startPoi = 0;
  let offsett = 0;
  let curPosi = 0;
  const barWidth = saveCont.clientWidth;

  saveCont.addEventListener('touchstart', (e) => {
    e.stopPropagation()
    startPoi = e.touches[0].pageX;
  }, true);

  saveCont.addEventListener('touchmove', (e) => {
    e.stopPropagation()
    offsett = curPosi + (e.targetTouches[0].pageX - startPoi);
    saveContCont.style.transform = `translate3d(${offsett}px, 0px, 0px)`;
    saveContCont.style.transitionDuration = '0ms';
  }, true);

  saveCont.addEventListener('touchend', (e) => {
    e.stopPropagation()
    const sum = curPosi + (e.changedTouches[0].pageX - startPoi);
    let destination = (sum / barWidth) * barWidth;
    if (destination > 0) {
      destination = 0;
    } else if (destination < -(barWidth * (dayList.length - 1))) {
      destination = -(barWidth * (dayList.length - 1));
    }

    saveContCont.style.transform = `translate3d(${destination}px, 0px, 0px)`;
    saveContCont.style.transitionDuration = '300ms';
    curPosi = destination;
  }, true)
};