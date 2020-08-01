from flask import Flask, render_template, request, jsonify
from PIL import Image
from sample import process_image
import time

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route("/generateCaption", methods=["POST"])
def send():
    file = request.files['image']
    img = Image.open(file)
    caption = process_image(img)

    time.sleep(5)

    data = {"caption": caption}
    resp = jsonify(data)
    resp.status_code = 200

    return resp



if __name__ == '__main__':
    app.run(debug=True)