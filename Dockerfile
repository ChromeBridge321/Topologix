# Usar una imagen base de Apache
FROM httpd:alpine

# Copiar los archivos del proyecto a la carpeta de Apache
COPY . /usr/local/apache2/htdocs/

# Exponer el puerto 80 (puerto predeterminado de Apache)
EXPOSE 80

# Comando para iniciar Apache (ya está configurado en la imagen base)