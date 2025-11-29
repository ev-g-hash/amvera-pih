# Используем официальный образ nginx с Alpine для меньшего размера
FROM nginx:1.25-alpine

# Устанавливаем необходимые пакеты
RUN apk add --no-cache curl

# Копируем статические файлы
COPY static/ /usr/share/nginx/html/static/
COPY index.html /usr/share/nginx/html/

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создаем директорию для логов
RUN mkdir -p /var/log/nginx

# Устанавливаем правильные права доступа
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Проверка здоровья контейнера
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]