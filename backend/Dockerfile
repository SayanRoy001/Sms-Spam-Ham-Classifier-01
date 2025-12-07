FROM python:3.10-slim

WORKDIR /code

# Copy requirements and install
COPY requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

COPY . /code

RUN useradd -m -u 1000 user
USER user
ENV HOME=/home/user \
	PATH=/home/user/.local/bin:$PATH

EXPOSE 7860

# Run the application using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:7860", "server:app"]
