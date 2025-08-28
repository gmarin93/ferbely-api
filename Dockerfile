# Choose base image
FROM python:3.13-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy your Django project
COPY . /app/

# Expose port 8000
EXPOSE 8000

# Command to run your Django app
CMD ["python", "ferbely_api/manage.py", "runserver", "0.0.0.0:8000"]