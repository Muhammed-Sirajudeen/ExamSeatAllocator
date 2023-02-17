from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
import pymongo
import pandas as pd
import os
from dotenv import load_dotenv
load_dotenv()
from database import DatabaseConnection
from sorterHelper import sorter
app = Flask(__name__)
api = Api(app)
CORS(app)

DF=pd.read_csv("./studentlist.csv")


try:
	DBCONNECTION=DatabaseConnection("seatdb","layouts")
	DBCOLLECTION=DBCONNECTION.connection()
	print("connection to the database is success")
except:
	print("connection to the database failed")


class LayoutPost(Resource):
	def get(self):
		try:
			mydoc = DBCOLLECTION.find()
			responsedata=[]
			for x in mydoc:
				responsedata.append(x["classnumber"])

			return jsonify({'status': '200OK',"data":responsedata,"error":None})
		except:
			return jsonify({'status':"503","error":"network error"})

	def post(self):
		try:
			data = request.get_json()
			uniqueflag=False #the variable to check if duplicate data is present
			myquery = { "classnumber": data["classnumber"] }
			mydoc = DBCOLLECTION.find(myquery)
			for collectionData in mydoc:
				uniqueflag=True
			if(uniqueflag):
				'''
					only post data to the database if there doesnt exist a duplicate data
				'''
				return {"status":"200OK","error":"duplicate"},201
			else:
				x = DBCOLLECTION.insert_one(data)
				return {"status":"200OK","error":None},201
		except:
			return {"status":"403NOTOK","error":"internal network error"},503		

class ExamSorter(Resource):
	def get(self):
		return {"status":"200OK","error":None}
	

	def post(self):
		data = request.get_json()
		subject_codes=[data["subjectcode"]]
		print(subject_codes)
		
		

		mydoc = DBCOLLECTION.find()
		array=sorter()
		return {"status":"200OK","error":None,"data":array}

api.add_resource(LayoutPost, '/')
api.add_resource(ExamSorter,'/sort')
if __name__ == '__main__':
	app.run(debug = True)
