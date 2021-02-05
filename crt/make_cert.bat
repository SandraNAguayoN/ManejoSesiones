@echo off
set /p domain="Ingresar dominio: "
set OPENSSL_CONF=openssl.cnf

if not exist .\%domain% mkdir .\%domain%

openssl req -config cert.conf -new -sha256 -newkey rsa:2048 -nodes -keyout %domain%\server.key -x509 -days 365 -out %domain%\server.crt

echo.
echo -----
echo El certificado fue creado.
echo.
pause