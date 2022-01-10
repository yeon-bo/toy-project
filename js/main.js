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

const dayCont = document.querySelector('.day-cont')

fetch(myAccountUrl)
  .then((response) => response.json())
  .then((data) => {
    // account-section 적용
    h1.textContent = data.accountName;
    accounNum.textContent = data.accountNumber;
    accounMoney.textContent = data.accountMoney.toLocaleString();
    progress.style.width = data.totalSpend / data.limit * 100 + '%';
    progress.style.backgroundColor = data.progressColor;
    const changes = data.limit - data.totalSpend;
    accountDesc.textContent = changes.toLocaleString();

    // save-cont 적용
    for (i = 0; i < data.saveList.length; i++) {
      const saveBar = document.createElement('li');
      const saveProgress = document.createElement('div');
      const saveName = document.createElement('span');
      const saveMoney = document.createElement('span');
      saveBar.className = 'save-bar';
      saveProgress.className = 'save-progress';
      saveName.className = 'save-name';
      saveMoney.className = 'save-money';
      saveName.textContent = data.saveList[i].name;
      saveMoney.textContent = data.saveList[i].money;
      saveProgress.style.width = data.saveList[i].money / data.saveList[i].target * 100 + '%';
      saveProgress.style.background = data.saveList[i].color;
      saveListH.appendChild(saveBar);
      saveBar.appendChild(saveProgress);
      saveBar.appendChild(saveName);
      saveBar.appendChild(saveMoney);
    }

    // day-list 적용
    let today = new Date();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    // 일별 날짜 나누기
    let dayGroub1 = []
    for (i = 0; i < data.bankList.length; i++) {
      dayGroub1.push(data.bankList[i].date);
    }
    const set = new Set(dayGroub1);
    const uniqueArr = [...set];
    console.log(uniqueArr)

    for (i = 0; i < data.bankList.length; i++) {
      dayGroub1.push(data.bankList[i].date);

      const dayList = document.createElement('li');
      const day = document.createElement('strong');
      const total = document.createElement('span');
      const spendCout = document.createElement('ul');
      const spendList = document.createElement('li');
      const spendTitle = document.createElement('span');
      const spendCost = document.createElement('span');

      dayList.className = 'day-list';
      day.className = 'day';
      total.className = 'total';
      spendCout.className = 'spend-cout';
      spendList.className = 'spend-list';
      // 수입시 색상 변경
      if (data.bankList[i].income === 'in') {
        spendList.className += ' deposit';
      }
      spendTitle.className = 'spend-title';
      spendCost.className = 'spend-cost';

      // 현재 날짜 계산_ date 배열로 분리 후 숫자로 변형 -> 현재 날짜와 비교
      let dayarr = data.bankList[i].date.split('-');
      let arrNum = dayarr.map(str => Number(str));
      if (month === arrNum[1]) {
        if (date === arrNum[2]) {
          day.textContent = '오늘';
        } else if (date === arrNum[2] - 1) {
          day.textContent = '내일';
        } else {
          day.textContent = `${date - arrNum[2]}일전`;
        }
      } else {
        day.textContent = `${arrNum[1]}월 ${arrNum[2]}일`;
      }
      total.textContent = data.bankList[i].price.toLocaleString();
      spendTitle.textContent = data.bankList[i].history;
      spendCost.textContent = data.bankList[i].price.toLocaleString();

      // 날짜별로 나누기

      // let reNum = uniqueArr.filter((element) => 
      // return)
      // uniqueArr

      // function reNum() {
      //   let zero = 0;
      //   return function innerFn(y){
      //     return x = x + y;
      //   }
      // }
      // reNum();
      // if (i = 0) {
      //   dayCont.appendChild(dayList)
      //   dayList.appendChild(day)
      //   dayList.appendChild(total)
      //   dayList.appendChild(spendCout)
      // } else {
      //   if (data.bankList[i].date === uniqueArr[zero]) {
      //     return
      //   } else {
      //     reNum(1);
      //     dayCont.appendChild(dayList);
      //     dayList.appendChild(day);
      //     dayList.appendChild(total);
      //     dayList.appendChild(spendCout);
      //   }
      // }

      // spendCout.appendChild(spendList);
      // spendList.appendChild(spendTitle);
      // spendList.appendChild(spendCost);

      dayCont.appendChild(dayList);
      dayList.appendChild(day);
      dayList.appendChild(total);
      dayList.appendChild(spendCout);
      spendCout.appendChild(spendList);
      spendList.appendChild(spendTitle);
      spendList.appendChild(spendCost);
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
  spend.style.transition = 'all .5s';

  function spendUpDown() {
    if (spend.style.transform === '') {
      spend.style.transform = 'translateY(-254px)';
    } else {
      spend.style.transform = '';
    }
  };



  // save-list영역 마우스 이벤트
  const saveCont = document.querySelector('.save-cont')
  const saveAdd = document.querySelector('.save-add')
  const saveListAll = document.querySelectorAll('.save-list')
  const saveContCont = document.querySelector('.save-contcont')

  const barWidth = saveCont.clientWidth;
  // 포인트 시작점
  saveCont.addEventListener('touchstart', (e) => {
    e.stopPropagation()
    startPo = e.touches[0].pageX;
  }, true);
  // 포인트가 움직임에 따라 같이 움직이기
  saveCont.addEventListener('touchmove', (e) => {
    e.stopPropagation()
    offset = curPos + (e.targetTouches[0].pageX - startPo);
    saveContCont.style.transform = `translate3d(${offset}px, 0px, 0px)`;
    saveContCont.style.transitionDuration = '0ms';
  }, true);
  // 화면의 위치가 처음 또는 마지막일때 유효한 화면으로 돌아가기
  saveCont.addEventListener('touchend', (e) => {
    e.stopPropagation()
    const sum = curPos + (e.changedTouches[0].pageX - startPo);
    let destination = Math.round(sum / barWidth) * barWidth;
    if (destination > 0) {
      destination = 0;
    } else if (destination < -(barWidth * (saveListAll.length - 1) + saveAdd)) {
      destination = -(barWidth * (saveListAll.length - 1) + saveAdd);
    }
    // 포인트 선택 화면이 처음으로 돌아가지 않게 현재 화면에 고정
    saveContCont.style.transform = `translate3d(${destination}px, 0px, 0px)`;
    saveContCont.style.transitionDuration = '300ms';
    curPos = destination;
  }, true)



  // day-cont 영역 이벤트
  const dayContCont = document.querySelector('.day-contcont');
  const dayListAll = document.querySelectorAll('.day-list');

  const screenHeight = dayContCont.clientHeight;
  // 포인트 시작점
  dayContCont.addEventListener('touchstart', (e) => {
    e.stopPropagation()
    startPos = e.touches[0].pageY;
  }, true);
  // 포인트가 움직임에 따라 같이 움직이기
  dayContCont.addEventListener('touchmove', (e) => {
    e.stopPropagation()
    offset = curPos + (e.targetTouches[0].pageY - startPos);
    dayCont.style.transform = `translate3d(0px, ${offset}px, 0px)`
    dayCont.style.transitionDuration = '0ms'
  }, true);
  // 포인트가 화면의 반 이상 넘거가면 화면 넘겨주기
  dayContCont.addEventListener('touchend', (e) => {
    e.stopPropagation()
    const sum = curPos + (e.changedTouches[0].pageY - startPos);
    let destination = Math.round(sum / screenHeight) * screenHeight;
    // 화면의 위치가 처음 또는 마지막일때 유효한 화면으로 돌아가기

    // 포인트 선택 화면이 처음으로 돌아가지 않게 현재 화면에 고정
    curPos = curPos + (e.changedTouches[0].pageY - startPos);
    dayCont.style.transform = `translate3d(0px, ${curPos}px, 0px)`
    dayCont.style.transitionDuration = '300ms'
  }, true)

};