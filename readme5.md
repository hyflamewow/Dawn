# Dawn
2018/05/18
## 目標
啟用SignalR CORS

## 修改 Sun
修改Startup.cs
```cs
options.AddPolicy("CorsPolicy",
    builder => builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
);
```
## 修改 Moon
values.component.ts
```ts
const hub = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5000/time')
    .build();
```

## 測試
```
Sun>dotnet run
Moon>ng serve
```
瀏覽 http://localhost:4200/