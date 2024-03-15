# model_api.py
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OrdinalEncoder
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load the dataset and preprocess it as you did in the Jupyter Notebook
ds = pd.read_csv("Furniture Price Prediction.csv")
ds = ds.drop('url', axis=1)
ds['price'].fillna(ds['price'].mean(skipna=True), inplace=True)

# Encoding categorical columns
encoder = OrdinalEncoder()
encoded_columns = ['furniture', 'type', 'sale']
ds[encoded_columns] = encoder.fit_transform(ds[encoded_columns])
ds = ds.astype({'furniture': 'int', 'type': 'int', 'sale': 'int'})

# Split the data into features (X) and target (y)
X = ds.iloc[:, 0:7]
y = ds['price']

# Scaling the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the model
model = LinearRegression()
model.fit(X_scaled, y)

# Create a Flask app
app = Flask(__name__)

@app.route('/api/furniture/estimate', methods=['POST'])
def estimate_furniture_price():
    try:
        data = request.get_json()
        furniture_description = data['description']

        # Preprocess the input furniture_description as needed to match the training data format
        # For example, extract relevant features, encode categorical values, and scale them.

        # Make the prediction using the trained model
        # Here, you would implement the necessary preprocessing based on the trained model
        # and call the predict method to get the estimated price

        # For demonstration purposes, return a random price between 500 and 5000
        estimated_price = np.random.randint(500, 5000)

        return jsonify({'estimatedPrice': estimated_price})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
