from flask import Flask, render_template, request, jsonify
from PIL import Image
from sample import cellcount_image
# from utils import pred_img
import time

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("index.html")

@app.route("/cellcount-image", methods=["POST"])
def send():
    file = request.files['image']
    img = Image.open(file)
    cell_count = cellcount_image(img)
    # mask, cell_count = pred_img(img)

    time.sleep(5)

    data = {"count": str(cell_count)}
    resp = jsonify(data)
    resp.status_code = 200

    return resp



if __name__ == '__main__':
    app.run(debug=True)