from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
app = Flask(__name__)
model=load_model("plant_disease_model.h5")
with open("classes.txt","r") as f:
    classes=[line.strip() for line in f]
@app.route("/")
def home():
    return "Plant Disease Prediction API is running!"
@app.route("/predict",methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    try:
        file=request.files['image']
        img=Image.open(file)
        img=img.resize((224,224))
        img = np.array(img) / 255.0
        if(len(img.shape)==2):
            img=np.stack((img,)*3,axis=-1)
        img=np.expand_dims(img,axis=0)
        prediction=model.predict(img)
        confidence=float(np.max(prediction))
        index=np.argmax(prediction)
        disease=classes[index]
        return jsonify({
        "disease": disease,
        "confidence": confidence
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
if(__name__=="__main__"):
    app.run();