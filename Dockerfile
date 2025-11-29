# Используем официальный образ nginx для production
# Используем официальный образ nginx для production
FROM nginx:alpine

# Удаляем стандартную конфигурацию nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем нашу конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/

# Копируем файлы веб-приложения в директорию nginx
COPY index.html style.css script.js /usr/share/nginx/html/

# Устанавливаем права доступа
RUN chmod -R 755 /usr/share/nginx/html

# Экспортируем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]