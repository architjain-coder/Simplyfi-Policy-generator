from urllib.request import urlopen
from bs4 import BeautifulSoup
from flask import Flask, render_template, request, url_for, redirect, session #importing libraries
from flask import Flask, request, url_for,Response, render_template_string
import pandas as pd
from flask import Flask, render_template, request

from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
# from voice_analysis import voice_analysis
import requests
import json
from bson.json_util import dumps
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
from model import *
@app.route("/classify", methods=['post', 'get'])
def classify():# method for complaint login
    if request.method == "POST":
        k = request.get_json(force=True)
        url = k["url"]
        html = urlopen(url).read()
        soup = BeautifulSoup(html, features="html.parser")

        # kill all script and style elements
        for script in soup(["script", "style"]):
            script.extract()    # rip it out

        # get text
        text = soup.get_text()

        # break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # break multi-headlines into a line each
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # drop blank lines
        text = '\n'.join(chunk for chunk in chunks if chunk)
        result = {}
        result["text"] = text 
        #print(text)
        predictPolicyLabel(text).to_csv("result {}.csv".format(url.split("//")[1]))
        response = app.response_class(response=dumps(result),mimetype='application/json')
        return response


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, threaded=True)
