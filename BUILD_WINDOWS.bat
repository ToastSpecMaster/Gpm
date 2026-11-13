@echo off
setlocal
cd /d "%~dp0"
echo =============================================
echo GRAND PRIX MANAGER 0.10.3 - WINDOWS BUILDER
echo =============================================
echo This one-time build requires Node.js 20 or newer and an internet connection.
echo The finished game runs as a normal Windows app; it does not need Python,
echo localhost, or a browser to be opened manually.
echo.
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js/npm was not found. Install Node.js 20 LTS or newer, then run this again.
  pause
  exit /b 1
)
call npm install
if errorlevel 1 goto failed
call npm run dist
if errorlevel 1 goto failed
echo.
echo Build complete. Find the Windows installer in the dist folder.
pause
exit /b 0
:failed
echo.
echo Build failed. Check the error above and try again.
pause
exit /b 1
