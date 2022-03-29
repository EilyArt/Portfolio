import subprocess

def my_scheduled_job():
    subprocess.run(['python3', 'manage.py', 'archive'])