#Ht-310 Office Chair - Black,Ht     Office Chair   Black,20%       193
#Light beige children's bedroom in gray,Hub Furniture,8,8,0%

from flask import Flask, request, jsonify
import joblib
import pandas as pd
from sklearn.preprocessing import OrdinalEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/estimate_price": {"origins": "http://localhost:3001"}})

# Load the trained model
model = joblib.load("./linear_regression_model.save")

# Load the scaler
scaler = joblib.load("./scaler.save")

# Load the dataset
ds = pd.read_csv("Furniture Price Prediction.csv")
ds = ds.drop('url', axis=1)

print("hello")
# Modify the encoding part in the Flask app
# Use a single encoder for all categorical features
en = OrdinalEncoder(handle_unknown='use_encoded_value', unknown_value=-1)
ds_encoded = en.fit_transform(ds[['furniture', 'type', 'sale']])
ds[['furniture', 'type', 'sale']] = ds_encoded

ds = ds.astype({'furniture': 'int', 'type': 'int', 'sale': 'int'})
@app.route('/estimate_price', methods=['POST'])
def estimate_price():
    try:
        data = request.get_json()
        print("Received data:", data)  # Print the received data

        # Check if 'description' key is present
        if 'description' not in data:
            return jsonify({'error': 'Missing or invalid input format'})

        user_input = data['description'].split(',', 4)
        print("User input:", user_input)  # Print the user input to check if it's parsed correctly
        # Ensure there are exactly three components
        if len(user_input) == 5:
            furniture, furniture_type, rate, delivery, sale_percentage = user_input
            print("furniture: ", furniture)
            print("type: ", furniture_type)
            print("rate: ", rate)
            print("delivery: ", delivery)
            print("sale: ", sale_percentage)

            input_df = pd.DataFrame([[furniture, furniture_type, sale_percentage]], columns=['furniture', 'type', 'sale'])
            print("Input DataFrame:", input_df)  # Print the input DataFrame to check its structure

            # Encode the categorical features
            input_df[['furniture', 'type', 'sale']] = en.transform(input_df[['furniture', 'type', 'sale']])
            print("Encoded input DataFrame:", input_df)  # Print the encoded input DataFrame

            # Convert encoded values to integers
            input_df = input_df.astype({'furniture': 'int', 'type': 'int', 'sale': 'int'})

            furniture_encoded = int(input_df.iloc[0, 0])
            type_encoded = int(input_df.iloc[0, 1])
            sale_encoded = int(input_df.iloc[0, 2])

            print("furniture_encoded", furniture_encoded)
            print("type_encoded", type_encoded)
            print("sale_encoded", sale_encoded)

        else:
            return jsonify({'error': 'Invalid input format'})

        # Predict the price
        input_data = [[furniture_encoded, type_encoded, rate, delivery, sale_encoded, 0]]
        print("Input data:", input_data)  # Print the input data

        # Ensure the input_data is a DataFrame with appropriate column names
        input_data_df = pd.DataFrame(input_data, columns=['furniture', 'type', 'rate', 'delivery', 'sale', 'price'])
        print("Input DataFrame for prediction:", input_data_df)  

        # Scale the input data using the loaded scaler
        input_data_scaled = scaler.transform(input_data_df)

        print("Input data scaled:", input_data_scaled)  # Print the scaled input data

        # Inverse transform to get the actual price
        input_data_actual = scaler.inverse_transform(input_data_scaled)
        print("Input data actual:", input_data_actual)  # Print the inverse transformed input data

        # Use the actual price for prediction
        estimated_price = model.predict(input_data_actual)[0]
        print("Estimated price:", estimated_price)  # Print the estimated price

        return jsonify({'estimated_price': estimated_price})

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True, port=2001)