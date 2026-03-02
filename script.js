const watchCounter = document.querySelector("#sw-counter");
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const resetBtn = document.querySelector("#reset-btn");

const formatSeconds = (totalMiliseconds) => {
    const totalSeconds = Math.floor(totalMiliseconds / 1000);
    const miliseconds = Math.floor((totalMiliseconds % 1000)/10);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${miliseconds.toString().padStart(2, '0')}`;
};

class StopWatch {
    startTime = 0;
  elapsedTimeInMiliseconds = 0;
  intervalId = null;

  start() {
    if(this.intervalId !== null){
        return
    }

    this.startTime = Date.now() - this.elapsedTimeInMiliseconds;


    this.intervalId = setInterval(() => {
        const now = Date.now()

      this.elapsedTimeInMiliseconds = now - this.startTime;
      watchCounter.textContent = formatSeconds(this.elapsedTimeInMiliseconds);
    }, 50);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  reset() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.elapsedTimeInMiliseconds = 0;
    watchCounter.textContent = "00:00:00:00";
  }
}

const sw1 = new StopWatch();
startBtn.addEventListener("click", () => {
  sw1.start();
});
stopBtn.addEventListener("click", () => {
  sw1.stop();
});
resetBtn.addEventListener("click", () => {
  sw1.reset();
});

