def process_data(data):
    numbers = [item for item in data if item.isdigit()]
    alphabets = [item for item in data if item.isalpha() and len(item) == 1]
    highest_alphabet = [max(alphabets, key=lambda x: x.upper())] if alphabets else []
    
    return numbers, alphabets, highest_alphabet
