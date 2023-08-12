from flask import Flask, render_template, request, jsonify
import db

app = Flask(__name__)

# Route for the home page
@app.route('/')
def index():
    return render_template('index.html')


# Flask api to suggest changes in educational section
@app.route('/send_data', methods=['POST'])
def send_data():
    data = request.get_json()
    # TODO call process function
    return data


if __name__ == '__main__':
    app.run(debug=True)
