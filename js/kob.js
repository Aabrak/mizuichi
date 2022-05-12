export default class Kob {
  constructor(x=Math.floor(Math.random()*10), y=2, z=2, wid=1, hei=1, mesh) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.wid = wid;
    this.hei = hei;
    this.mesh = mesh;
  }
}