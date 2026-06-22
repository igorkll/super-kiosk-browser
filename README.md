# super-kiosk-browser
this browser is designed for kiosks ONLY  
ensures the complete absence of hotkeys and pop-ups. suitable for keyboard kiosks  
if you need to create a bootable image for your kiosk, you can use a ready-made utility: https://github.com/igorkll/mkbootable  

## hotkeys disabled
* F5
* F11
* F12
* ctrl+R
* ctrl+W
* ctrl+Q
* ctrl+M

## why does it exist
I made this little project because the kiosks in all the browsers that I've seen are FULL OF SHIT!!! EVERYTHING AT ALL!  
The hotkeys don't turn off completely, and the browser interface sometimes flashes when loading. Pop-up windows will often appear on top of the kiosk.  
this project solves this by making a NORMAL kiosk browser.  

## launch

### linux arm64
```
cd super_kiosk_browser_build/super_kiosk_browser-linux-arm64
./super_kiosk_browser http://youtube.com
```

### linux x64
```
cd super_kiosk_browser_build/super_kiosk_browser-linux-x64
./super_kiosk_browser http://youtube.com
```

### windows
```
cd super_kiosk_browser_build/super_kiosk_browser-win32-x64
super_kiosk_browser.exe http://youtube.com
```


