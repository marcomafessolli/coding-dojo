class Timer {
    constructor({ initialTimeLeft }) {
        this.initialTimeLeft = initialTimeLeft || 60;
        this.timeLeft = this.initialTimeLeft;
        this.interval = null
    }

    start() {
        this.interval = setInterval(() => {
            const currentClock = this.timeLeft - 1;
            this.timeLeft = currentClock;

            const { minutes, seconds } = Timer.format(currentClock);

            if (minutes === 0 && seconds === 0) {
                this.stop();

                if (typeof(this.onDoneCallback) == 'function') {
                    this.onDoneCallback();
                }
            }

            if (typeof(this.onUpdateCallback) == 'function') {
                this.onUpdateCallback({ minutes, seconds });
            }
        }, 1000);

        return this;
    }

    reset() {
        this.stop();
        this.timeLeft = this.initialTimeLeft;

        return this;
    }

    onDone(callback) {
        if (typeof(callback) == 'function') {
            this.onDoneCallback = callback;
        }

        return this;
    }

    onUpdate(callback) {
        if (typeof(callback) == 'function') {
            this.onUpdateCallback = callback;
        }

        return this;
    }

    stop() {
        clearInterval(this.interval);
    }

    static format(time) {
        const minutes = Math.trunc(time / 60);
        const seconds = time % 60;

        return { minutes, seconds }
    }
}

export { Timer };
