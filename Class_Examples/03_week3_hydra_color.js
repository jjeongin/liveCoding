// third parameter shifts the color channels
// if you use PI then the channels are completely overlapped, thus pink and green
osc(60,0.1,3.14).out()
// TWO PI will bring it full circle back to b&w
osc(60,0.1,6.28).out()

//shift colors, try different bands of oscs
osc(6,0.1,0).color(1,0,0)
  .add(osc(60,0.11,0).color(0,1,0))
  .add(osc(3,0.12,0).color(0,0,1))
  .out()

//hue 0 & 1 are the same
osc(8,0.1,1).hue(1).out()

//colorama shifts all hsv values in interesting ways but can be unpredictable
gradient(0.1).colorama(0.1).out()
// stringing them together brings unexpected results:
gradient(0.1).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).out()
//another example
gradient(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).colorama(0.1).out()

//mult it by some shapes
gradient(0.1).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01).colorama(0.01)
  .mult(shape(4,0.5)
    .repeat(10,10))
  .out()

//javascript shorthand to append 10 coloramas to one gradient
/*
The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
syntax: reduce(callbackFn, initialValue)
*/
new Array(10).fill().reduce((a)=>a.colorama(.01),gradient(.1)).mult(shape(4,0.5).repeat(10,10)).out()
// mix that with a thresholded webcam image (you might not need the invert depending on what's dark and light in your webcam image)
s0.initCam()
new Array(10).fill().reduce((a)=>a.colorama(.02),gradient(.1)).mult(src(s0).thresh(.3).invert()).out()
// added to pixelate gives interesting results
osc().modulate(noise().pixelate()).colorama().out()

// hue used with feedback - because we shift the hue ever so slightly and then feed it back the simple blue starts shifting
src(o0)
  .modulateRotate(noise(1,0.01),0.03)
  .hue(0.003)
  .layer(shape(2,0.0125)
    .luma()
    .color(0,0,1))
  .out(o0)

// the original blue bar layered on top, needs luma to give transparency
shape(2,0.0125).luma().color(0,0,1).out()

//luma is like thresh but preserves the color of the bright parts
// it also returns a transparent image (rather than black) so it's good for layering
// first arguement is for threshold, second is for blurriness
osc(200,0.01,1).rotate(1).out()
osc(30,0,1).luma(0.5,0.01).out()

osc(200,0.01,1)
  .rotate(1)
  .layer(osc(30,0,1)
    .luma(0.5,0.01))
  .out(o0)

// take the second osc and create shadow effect (see hydra book for how this works)
// black with transparent gradient bands
osc(30,0,1)
  .luma(0.2,.2)
  .color(0,0,0,1)
  .out() // change one color value to see how it works

// layer ontop of original
osc(30,0,1)
  .luma(0.2,.2)
  .color(0,0,0,1)
  .layer(osc(30,0,1)
    .luma(0.5,0.01))
  .out(o0)

// layer all of that ontop of the first osc
osc(200,0.01,1)
  .rotate(1)
  .layer(osc(30,0,1)
    .luma(0.2,.2)
    .color(0,0,0,1))
  .layer(osc(30,0,1)
    .luma(0.5,0.01))
  .out(o0)

// modulate with noise
osc(200,0.01,1)
  .rotate(1)
  .layer(osc(30,0,1)
    .luma(0.2,.2)
    .color(0,0,0,1))
  .layer(osc(30,0,1)
    .luma(0.5,0.01))
  .modulate(noise(3,.1))
  .out(o0)

// with sine
osc(200,0.01,1)
  .rotate(1)
  .layer(osc(30,0,1)
    .luma(0.2,.2)
    .color(0,0,0,1))
  .layer(osc(30,0,1)
    .luma(0.5,0.01))
  .modulate(noise(()=>(Math.sin(time)*.5+.5)*3,.1))
  .out(o0)

// using a color palette from coolors.co
//this is all setup code
let DD=0.01
let b=(o,u,i,y,z)=>o().add(solid(1,1,1),DD).thresh(i*0.2*(z-y)+y,0.0001).luma(0.5,0.0001).color(c(u,i,0),c(u,i,1),c(u,i,2))
let c=(u,i,j)=>{
  let cc = u.split("/"), cs = cc[cc.length - 1].split("-")
  return parseInt("0x" + cs[i].substring(2*j, 2+2*j))/255
}
let colorize=(x,u,y=0,z=1)=>b(x,u,0,y,z).layer(b(x,u,1,y,z)).layer(b(x,u,2,y,z)).layer(b(x,u,3,y,z)).layer(b(x,u,4,y,z))
// this is what we actual run
// takes exactly five colors, in hex values separated by -
let url='https://coolors.co/8ecae6-219ebc-023047-ffb703-fb8500'
let func=()=>osc(20,0.02,0).modulate(noise()).mult(shape(4,.3,.4).repeat(4,4))
colorize(func,url).out()

solid().out()
