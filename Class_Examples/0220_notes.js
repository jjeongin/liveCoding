a.setBins(16)
a.show()

osc(()=>a.fft[0]).out() // fft displays bands of each frequency based on the micrphone audio
