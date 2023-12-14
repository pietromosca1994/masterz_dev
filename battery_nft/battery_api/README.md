#### Setup a Conda Environment
1. Create the [Conda](https://docs.conda.io/projects/miniconda/en/latest/) environment
```bash 
conda create -n BatteryNFT_env
conda activate BatteryNFT_env
```

2. Install pip
```bash
conda install -c anaconda pip
```

2. Install requirements 
```bash
pip install -r requirements.txt
```

#### Prepare the Lambda Function
1. Create lib folder with dependencies Python packages
```bash 
pip install -t lib -r requirements.txt
```

2. Create a .zip file with the libraries 
```bash 
(cd lib; zip ../lambda_function.zip -r .)
```

3. Add main.py to the package
```bash
zip lambda_function.zip -u main.py
```

4. Upload ```lambda_function.zip``` to AWS Lambda