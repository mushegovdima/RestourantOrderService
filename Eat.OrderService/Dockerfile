#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 81

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Eat.OrderService/Eat.OrderService.csproj", "Eat.OrderService/"]
COPY ["Eat.SDK/Eat.SDK.csproj", "Eat.SDK/"]
RUN dotnet restore "Eat.OrderService/Eat.OrderService.csproj"
COPY . .
WORKDIR "/src/Eat.OrderService"
RUN dotnet build "Eat.OrderService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Eat.OrderService.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Eat.OrderService.dll"]
