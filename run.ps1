# Mở cửa sổ PowerShell mới và chạy lệnh yarn dev trong thư mục backend
Start-Process powershell -ArgumentList "-NoExit","-Command","cd backend; yarn dev"

# Mở cửa sổ PowerShell mới và chạy lệnh yarn build:css trong thư mục frontend
Start-Process powershell -ArgumentList "-NoExit","-Command","cd frontend; yarn build:css"

# Mở cửa sổ PowerShell mới và chạy lệnh yarn start trong thư mục frontend
Start-Process powershell -ArgumentList "-NoExit","-Command","cd frontend; yarn start"
