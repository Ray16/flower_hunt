To run fastapi: 
uvicorn main:app --reload --port 8001
uvicorn main:app --host 0.0.0.0 --port 8001
uvicorn example:app --port 8002

To use the app-builder: 
python3 -m pip install --upgrade appbuilder-sdk

Haoran's appbuilder key:
bce-v3/ALTAK-eh4pLo8laymbjz6VkHpAf/0a09449916ea91c7ee9d34af4b2ef238121d51ce

App_id:
4885c346-800e-4492-bc65-f507289d55e8

提出三个关于个人的简短的有趣的问题

To get a virtual environment first in your directory:
python -m env env

Firebase Private key: 
X-Axm8MBACoImeLdY8yBiA3aoNHmk3LyzjXEtMAL5EQ

To install firebase: 
pip install firebase-admin

If you have sudo:
sudo apt install python3.9
source venv/bin/activate


To install python 3.9 virtually if you don't have sudo:
curl https://pyenv.run | bash
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
source ~/.bashrc
pyenv install 3.9.0
pyenv global 3.9.0
python --version

Now you should be able to run appbuilder as it requires python3.9

If you have both 3.8 and 3.9 yet it points to 3.8:
Search the following in ChatGPT and the answer will work. You need to reinstall appbuilder:
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1
sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.9 2
sudo update-alternatives --config python3 (select the number you need)
python3 --version
