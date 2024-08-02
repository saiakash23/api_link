import json
from flask import Blueprint, request, jsonify
from collections import OrderedDict
from .utils import process_data


bp = Blueprint('main', __name__)

@bp.route('/bfhl', methods=['GET'])
def get_operation_code():
    return jsonify({"operation_code": 1}), 200

@bp.route('/bfhl', methods=['POST'])
def post_data():
    try:
        data = request.json.get('data', [])
        if not data:
            return jsonify({"is_success": False, "message": "No data provided"}), 400

        user_id = "john_doe_17091999"  # Example user_id, replace as necessary
        email = "john@xyz.com"         # Example email, replace as necessary
        roll_number = "ABCD123"        # Example roll number, replace as necessary

        numbers, alphabets, highest_alphabet = process_data(data)

        response = OrderedDict([
            ("is_success", True),
            ("user_id", user_id),
            ("email", email),
            ("roll_number", roll_number),
            ("numbers", numbers),
            ("alphabets", alphabets),
            ("highest_alphabet", highest_alphabet)
        ])
        
        # Manually create the JSON response string
        response_json = json.dumps(response)
        
        # Return the response as a JSON response
        return jsonify(json.loads(response_json)), 200
    except Exception as e:
        return jsonify({"is_success": False, "message": str(e)}), 500

