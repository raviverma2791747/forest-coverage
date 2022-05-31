from flask import Flask,request,send_file
from flask import jsonify
from flask_cors import CORS,cross_origin
import uuid
import model

MODEL_PATH = "model/unet.h5"
MODEL_OUTPUT_PATH = "output"


app = Flask(__name__)
CORS(app)

model = model.Model(MODEL_PATH,MODEL_OUTPUT_PATH)

@app.route('/',methods=['GET'])
@cross_origin()
def index():
    return '<h1>Background Removal API</h1>'

@app.route('/api/upload',methods=['POST'])
@cross_origin()
def predict():
    try:
        img = request.files['image']
        _id = str(uuid.uuid4())
        img_path = f"./uploads/{_id}.png"
        img.save(img_path)
        coverage = model.predict(img_path,_id)
        return jsonify({ 'status' : 200, 'data' : {'id':_id ,'coverage': coverage},'message':'Image ID'})
    except:
        app.logger.info('[500]: Something went wrong!')
        return jsonify({'status': 500 ,'data':None,'message':'Something went wrong!'})

@app.route('/api/media/upload/<image_id>',methods=['GET'])
@cross_origin()
def get_upload(image_id):
    try:
        image_path = f'./uploads/{image_id}.png'
        return send_file(image_path, mimetype='image/gif')
    except:
        return jsonify({'status' : 404, 'message' : 'Image not found!'})


@app.route('/api/media/download/<image_id>',methods=['GET'])
@cross_origin()
def get_output(image_id):
    try:
        image_path = f'./output/{image_id}.png'
        return send_file(image_path, mimetype='image/gif')
    except:
        return jsonify({'status' : 404, 'message' : 'Image not found!'})


if __name__ == '__main__':
    app.run(debug=True,threaded=True,port=5000)