# Dawn
2018/05/18
## 目標
Angular with ASP.NET Core
## 環境
1. NodeJS: v8.11.2
1. NET Core: 2.1.200
1. @angular/cli : v6.0.3
## 檢查
1. $ node --version
1. $ dotnet --version
1. $ ng --version
## 開發工具
1. Visual Studio Code
1. 安裝C#
## 建立專案目錄
建立Dawn目錄
## 建立Moon專案
```
Dawn>ng new Moon --skip-install --routing --style=scss
```
刪除.git目錄
## 建立Sun專案
```
Dawn>dotnet new webapi -o Sun
Sun $ curl https://raw.githubusercontent.com/github/gitignore/master/VisualStudio.gitignore --output .gitignore
```
## 加入版控
```
Dawn>git init
Dawn>git add .
Dawn>git commit -m "first commit"
```
## 調整Moon程式
修改Moon/angular.json，為了輸出到ASP.NET Core的專案。
```
"outputPath": "../Sun/wwwroot",
```
新增proxy.conf.json，為了Debug使用
```
{
  "/api":{
    "target": "http://localhost:5000",
    "secure": false
  }
}
```
修改package.json，為了啟用Debug
```
"start": "ng serve --proxy-config proxy.conf.json",
"build": "ng build --prod",
```
修改index.html，為了站台不一定在Root下的問題。
```
<base href="./">
```
## 調整Sun程式
修改Sun/Startup.cs，為了實現SPA設計。
```
app.UseMvc();
app.UseDefaultFiles();
app.UseStaticFiles();
app.Run( async (context) =>
{
    if (!Path.HasExtension(context.Request.Path.Value))
    {
        await context.Response.SendFileAsync(Path.Combine(env.WebRootPath,"index.html"));
    }
});
```
## 修改 Sun/.gitignore
```
# Uncomment if you have tasks that create the project's static files in wwwroot
wwwroot/
...
# Visual Studio Code
.vscode/
```
## 開始建置
```
Moon>npm i
Moon>npm run build
Sun>dotnet restore
Sun>dotnet run
```
瀏覽 http://localhost:5000/
## 版控
```
Dawn>git add .
Dawn>git commit -m "incubator"
```
