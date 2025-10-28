@echo off
REM Pencere boyutunu buyuterek daha fazla bilginin sigmasini sagla
MODE CON: COLS=120 LINES=50
title Windows KAPSAMLI BILGI ARACI - IHSAN BAKI DOGAN(V.2.3)
REM Renk kodu 0A: Siyah Arka Plan, Açık Yeşil Yazı
color 0A
setlocal enabledelayedexpansion

REM ******************************************
REM ** VERSİYON BİLGİSİ: 5.2 (GPU Duzeltme, PSU Kaldirildi) **
REM ******************************************

REM ******************************************
REM ** Ekran Temizligi ve Baslik            **
REM ******************************************
cls
echo =================================================================
echo *** WINDOWS KAPSAMLI BILGI ARACI - IHSAN BAKI DOGAN (V.2.3)     ***
echo =================================================================

REM ******************************************
REM ** GENEL SISTEM BILGILERI               **
REM ******************************************
echo.
echo *** GENEL SISTEM BILGILERI ***
echo Bilgisayar Adi:      %computername%
echo Aktif Kullanici:     %username%

REM Seri Numarasi
set "SERIAL_NO=Bulunamadi"
for /f "tokens=*" %%a in ('powershell -command "Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber"') do (
    set "SERIAL_NO=%%a"
)
echo Seri Numarasi:       !SERIAL_NO!

REM PC Marka ve Model
set "PC_MARKA=Bulunamadi"
set "PC_MODEL=Bulunamadi"
for /f "tokens=*" %%a in ('powershell -command "Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object -ExpandProperty Manufacturer"') do (
    set "PC_MARKA=%%a"
)
for /f "tokens=*" %%a in ('powershell -command "Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object -ExpandProperty Model"') do (
    set "PC_MODEL=%%a"
)
echo Marka/Uretici:       !PC_MARKA!
echo Model:               !PC_MODEL!


REM ******************************************
REM ** ANAKART (MOTHERBOARD) BILGISI        **
REM ******************************************
echo.
echo *** ANAKART BILGISI (MOTHERBOARD) ***
powershell -command "Get-CimInstance -ClassName Win32_BaseBoard | Select-Object Manufacturer, Product, Version, SerialNumber | Format-List | Out-String -Width 4096" 2>&1 | findstr /v /r /c:"^ *$" || (echo [Hata: Bilgi alinamadi veya erisim engellendi.])


REM ******************************************
REM ** ISLEMCI (CPU) BILGISI                **
REM ******************************************
echo.
echo *** ISLEMCI (CPU) BILGISI ***
powershell -command "Get-CimInstance -ClassName Win32_Processor | Select-Object Name, @{Name='Cekirdek/Izlek';Expression={$_.NumberOfCores.ToString() + ' Cekirdek / ' + $_.NumberOfLogicalProcessors.ToString() + ' Izlek'}} | Format-List | Out-String -Width 4096" 2>&1 | findstr /v /r /c:"^ *$" || (echo [Hata: Bilgi alinamadi veya erisim engellendi.])


REM ******************************************
REM ** EKRAN KARTI (GPU) BILGISI            **
REM ******************************************
echo.
echo *** EKRAN KARTI (GPU) BILGISI ***
REM Basitlestirilmis komut kullaniliyor
powershell -command "Get-CimInstance -ClassName Win32_VideoController | Select-Object Caption, DriverVersion, AdapterRAM | Format-Table -AutoSize | Out-String -Width 4096" 2>&1 | findstr /v /r /c:"^ *$" || (echo [Hata: Bilgi alinamadi veya erisim engellendi.])


REM ******************************************
REM ** RAM VE SLOT BILGISI                  **
******************************************
echo.
echo *** RAM BILGISI ***

REM Toplam RAM
for /f "tokens=*" %%a in ('powershell -command "$ram = Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object -ExpandProperty TotalPhysicalMemory; [math]::Ceiling($ram / 1GB)" 2^>^&1') do (
    set "RAM_GB=%%a"
)
set "RAM_GB=!RAM_GB: =!"
echo Yuklu Toplam RAM:    !RAM_GB! GB

REM RAM Slotlari
for /f "tokens=*" %%a in ('powershell -command "(Get-CimInstance -ClassName Win32_PhysicalMemoryArray).MemoryDevices" 2^>^&1') do (
    set "SLOT_TOPLAM=%%a"
)
for /f "tokens=*" %%a in ('powershell -command "(Get-CimInstance -ClassName Win32_PhysicalMemory | Measure-Object).Count" 2^>^&1') do (
    set "SLOT_DOLU=%%a"
)

if "!SLOT_TOPLAM!" neq "" if "!SLOT_DOLU!" neq "" (
    set /a SLOT_BOS=!SLOT_TOPLAM! - !SLOT_DOLU!
) else (
    set "SLOT_BOS=?"
)

echo RAM Slot Durumu:     Toplam: !SLOT_TOPLAM!, Dolu: !SLOT_DOLU!, Bos: !SLOT_BOS!

REM RAM Modul Detaylari
echo.
echo RAM Modulleri (Detay):
powershell -command "Get-CimInstance -ClassName Win32_PhysicalMemory | Select-Object BankLabel, Manufacturer, @{Name='Boyut (GB)';Expression={[math]::Round($_.Capacity / 1GB)}}, Speed | Format-Table -AutoSize | Out-String -Width 4096" 2>&1 | findstr /v /r /c:"^ *$" || (echo [Hata: Bilgi alinamadi veya erisim engellendi.])


REM ******************************************
REM ** DISK BILGISI (SSD/HDD ve Arayuz)     **
REM ******************************************
echo.
echo *** DISK BILGISI ***
echo Disk/Diskler:
powershell -command "Get-PhysicalDisk | Select-Object @{Name='Disk Adi';Expression={$_.FriendlyName}}, @{Name='Boyut';Expression={([math]::Round($_.Size / 1000000000)).ToString() + ' GB'}}, @{Name='Tip';Expression={$_.MediaType}}, @{Name='Arayuz';Expression={if ($_.BusType -eq 11) {'NVMe (PCIe)'} elseif ($_.BusType -eq 3) {'SATA'} else {'Diger (' + $_.BusType + ')'}}} | Format-Table -AutoSize | Out-String -Width 4096" 2>&1 | findstr /v /r /c:"^ *$" || (echo [Hata: Bilgi alinamadi veya erisim engellendi.])


REM ******************************************
REM ** SOGUTUCU (COOLER/FAN) BILGISI        **
REM ******************************************
echo.
echo *** SOGUTUCU (FAN) BILGISI ***
powershell -command "Get-CimInstance -ClassName Win32_Fan | Select-Object Caption, Status, DesiredSpeed, ActiveCooling | Format-Table -AutoSize | Out-String -Width 4096" 2>&1 | findstr /v /r /c:"^ *$" || (echo [BILGI: Fan/Sogutucu bilgisi donanim destegine bagli olarak eksik olabilir.])


REM ******************************************
REM ** ETKI ALANI VE ISLETIM SISTEMI BILGISI**
REM ******************************************
echo.
echo *** ETKI ALANI BILGISI ***
set "PART_OF_DOMAIN=?"
set "DOMAIN_OR_WORKGROUP=?"

for /f "tokens=*" %%a in ('powershell -command "Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object -ExpandProperty PartOfDomain"') do (
    set "PART_OF_DOMAIN=%%a"
)
for /f "tokens=*" %%a in ('powershell -command "Get-CimInstance -ClassName Win32_ComputerSystem | Select-Object -ExpandProperty Domain"') do (
    set "DOMAIN_OR_WORKGROUP=%%a"
)

if /i "!PART_OF_DOMAIN!"=="True" (
    echo Etki Alani Durumu:   DOMAIN
    echo Etki Alani Adi:      !DOMAIN_OR_WORKGROUP!
) else (
    echo Etki Alani Durumu:   WORKGROUP
    echo Calisma Grubu Adi:   !DOMAIN_OR_WORKGROUP!
)

set "OS_Adi=Bulunamadi"
for /f "tokens=*" %%a in ('systeminfo ^| findstr /C:"Isletim Sistemi Adi" /C:"OS Name"') do (
    set "OS_Raw=%%a"
)
if defined OS_Raw (
    for /f "tokens=*" %%b in ('powershell -command "('!OS_Raw:*:=!').Trim()"') do (
        set "OS_Adi=%%b"
    )
)
echo Isletim Sistemi:     !OS_Adi!

REM ******************************************
REM ** WINDOWS LISANS BILGISI               **
REM ******************************************
echo.
echo *** WINDOWS LISANS BILGISI ***
cscript //nologo "%SystemRoot%\system32\slmgr.vbs" -dli | findstr /v /r /c:"^ *$" || (echo [Hata: Lisans bilgisi alinamadi.])

echo.
echo =================================================================
echo Bilgiler goruntulenmistir. Kapatmak icin bir tusa basin...
pause >nul