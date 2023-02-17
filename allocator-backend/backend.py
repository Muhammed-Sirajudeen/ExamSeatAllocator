from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
import pymongo
import pandas as pd

app = Flask(__name__)
api = Api(app)
CORS(app)

class DatabaseConnection():
	'''
		Initiated a class for reusing database connection and to work with multiple databases in future
	'''
	def __init__(self,dbname,collection) -> None:
		self.url=""
		self.dbname=dbname
		self.collection=collection

	def connection(self) -> object:
		myclient = pymongo.MongoClient(self.url)
		mydb = myclient[self.dbname]
		mycol=mydb[self.collection]
		return mycol

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

		return {"status":"200OK","error":None}

api.add_resource(LayoutPost, '/')
api.add_resource(ExamSorter,'/sort')
if __name__ == '__main__':
	app.run(debug = True)
