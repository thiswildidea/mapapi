const moment = {
  getDate() {
    const date = new Date();
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  },
  getTime() {
    const date = new Date();
    return `${this.padDate(date.getHours())}:${this.padDate(date.getMinutes())}:${this.padDate(date.getSeconds())}`;
  },
  padDate(value) {
    return value < 10 ? '0' + value : value;
  },

  getDataTimeNow() {
      const date = new Date();
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 00:00:00`;
  },

  getInteralDate(hour) {
    const date = new Date();
    return Math.round(new Date().getTime() - 1000 * 60 * 60 * hour)
  },
};

export default moment;
