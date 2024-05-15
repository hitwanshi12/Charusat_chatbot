from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

app = Flask(__name__)
CORS(app) 
@app.route('/api/question', methods=['POST'])
def process_question():
    data = request.get_json()
    question = data.get('questions')

    try:
        # Execute a Python script with the question as an argument
        result = subprocess.check_output(["python", "charusat_faq.py", question], universal_newlines=True)
        print(result)
        return jsonify({'answer': result.strip()})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)