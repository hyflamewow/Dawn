# Dawn
2018/06/04
## 目標
啟用CORS
## 修改Moon
values.component.ts
```ts
getList() {
    this.http.get<string[]>('http://localhost:5000/api/values')
      .subscribe(list => {
        this.list = list;
      });
  }
```
## 修改 Sun
Startup.cs
```cs
public void ConfigureServices(IServiceCollection services)
{
    services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
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
    else
    {
        app.UseHsts();
    }

    // app.UseHttpsRedirection();
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

## 測試
```
Sun>dotnet run
Moon>ng serve
```
瀏覽 http://localhost:4200/