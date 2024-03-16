# S2T - AI powered Speech to Text converter

## Environment
Tested on this setup (current VRAM: 6GB GDDR6):
```bash
neofetch  # OS: Linux Mint 21.3 x86_64
          # CPU: Intel i7-7700K (8) @ 4.500GHz
          # GPU: NVIDIA GeForce GTX 1660 SUPER 
          # Memory: 16gb     

python3 --version  # Python 3.10.12
```

## Install Dependencies:
- Install **Node** and **npm** through **nvm**:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

- Install **FFmpeg**:
```bash
sudo apt update && sudo apt upgrade
sudo apt install ffmpeg
```

- Install **PyTorch**
Installation varies according to hardware.
[Select your preferences and run the install command](https://pytorch.org/get-started/locally/)

i.e.: current setup...

```
PyTorch Build: Stable (2.2.1)
Your OS: Linux
Package: Pip
Language: Python
Compute Platform: CUDA 11.8
```
generates this installation command:
```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

- Install **WhisperAI**:
```bash
python3 -m pip install -U openai-whisper
```

## Clone Repository and run server locally:
```bash
git clone https://github.com/Perlesvaux/s2t
cd s2t 
npm i
npm start
```

App is now ready. [Click here](https://perlesvaux.github.io/stt/)

Front end source code can be found [here](https://github.com/Perlesvaux/stt)


