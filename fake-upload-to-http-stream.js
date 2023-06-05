import { Readable } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 50) {
        this.push(null);
      } else {
        const buff = Buffer.from(i.toString());
        this.push(buff);
      }
    }, 100);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredStream(),
  duplex: "half",
})
  .then((response) => response.text())
  .then((data) => console.log(data));
