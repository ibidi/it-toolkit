@echo off
:: Parola Güvenliği Denetleyici (örnek)
set /p pass=Bir parola girin: 
if "%pass%"=="" (
    echo Parola bos olamaz.
    exit /b
)
if "%pass:~7,1%"=="" (
    echo Parola zayif: En az 8 karakter olmali.
) else (
    echo Parola uzunlugu yeterli.
)
pause
