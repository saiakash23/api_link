from flask import Flask, request, jsonify
from app.routes import bp

app = Flask(__name__)
app.register_blueprint(bp)

@app.route('/')
def index():
    return 'Flask app running on Vercel!'

if __name__ == "__main__":
    app.run()
