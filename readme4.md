# Dawn
2018/05/18
## 目標
啟用SignalR

## 安裝
```
Sun>dotnet add package Microsoft.AspNetCore.SignalR --version 1.0.0-rc1-final
Moon>npm i @aspnet/signalr@1.0.0-rc1-update1
```
## 修改 Sun
新增 TimeHub.cs
```cs
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace Sun
{
    public class TimeHub : Hub
    {
        private static IHubCallerClients globalClients;
        public void Send(string message)
        {
            Clients.All.SendAsync("send", message);
        }
        public void Register()
        {
            if(globalClients == null)
            {
                globalClients = Clients;
                SendTime();
            }
        }
        public async static void SendTime()
        {
            await globalClients.All.SendAsync("send", DateTime.Now.ToLongTimeString());
            Thread.Sleep(1000);
            SendTime();
        }
    }
}
```
修改Startup.cs
```cs
public void ConfigureServices(IServiceCollection services)
{
	services.AddMvc();
	services.AddCors(options =>
	{
		options.AddPolicy("CorsPolicy",
			builder => builder
				.AllowAnyOrigin()
				.AllowAnyMethod()
				.AllowAnyHeader()
		);
	});
	services.Configure<MvcOptions>(options =>{
		options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
	});
	services.AddSignalR();
}

// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
	if (env.IsDevelopment())
	{
		app.UseDeveloperExceptionPage();
	}

	app.UseMvc();
	app.UseDefaultFiles();
	app.UseStaticFiles();
	app.UseCors("CorsPolicy");
	app.UseSignalR(routes => {
		routes.MapHub<TimeHub>("/time");
	});
	app.Run(async (context) =>
   {
	   if (!Path.HasExtension(context.Request.Path.Value))
	   {
		   await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
	   }
   });
}
```
Startup.cs
```cs
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                );
            });
            services.Configure<MvcOptions>(options =>{
                options.Filters.Add(new CorsAuthorizationFilterFactory("CorsPolicy"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");
            app.Run(async (context) =>
           {
               if (!Path.HasExtension(context.Request.Path.Value))
               {
                   await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));
               }
           });
        }
```
## 修改 Moon
values.component.html
```
<h1>{{title}}</h1>
<ul class="list-group">
  <li class="list-group-item" *ngFor="let item of list">
    {{item}}
  </li>
</ul>
```
values.component.ts
```ts
 ngOnInit() {
    this.getList();
    this.connectSignalR();
  }

  connectSignalR() {
    const hub = new signalR.HubConnectionBuilder()
      .withUrl('/time')
      .build();
    hub.on('send', data => {
      this.title = data;
    });
    hub.start()
      .then(() => hub.invoke('register'));
  }
```

## 測試
```
Moon>npm run build
Sun>dotnet run
```
瀏覽 http://localhost:5000/