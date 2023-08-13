from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import synos

app = Flask(__name__)
CORS(app)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')



# Flask api to suggest changes in educational section
@app.route('/send_data', methods=['POST'])
def send_data():
    data = request.get_json()
    query = data['query']
    status = synos.extract_data(query)
    # TODO call process function
    return status


if __name__ == '__main__':
    app.run(debug=True)
