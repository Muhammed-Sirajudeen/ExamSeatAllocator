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
	DBCONNECTION=DatabaseConnection("seatdb")
	DBCONNECTION.connection()
	DBCONNECTION.collection("layouts")
	print("connection to the database is success")
except:
	print("connection to the database failed")


	
class LayoutPost(Resource):
	def get(self):
		try:
			DBCONNECTION.collection("layouts")
			mydoc=DBCONNECTION.mycol.find()
			responsedata=[]
			for x in mydoc:
				if(x!=None):
					print(x)
					responsedata.append(x["classnumber"])
				else:
					pass
			return jsonify({'status': '200OK',"data":responsedata,"error":None})
		except:
			return jsonify({'status':"503","error":"network error"})

	def post(self):
		try:
			DBCONNECTION.collection("layouts")
			data = request.get_json()
			uniqueflag=False #the variable to check if duplicate data is present
			myquery = { "classnumber": data["classnumber"] }
			mydoc = DBCONNECTION.mycol.find(myquery)
			for collectionData in mydoc:
				uniqueflag=True
			if(uniqueflag):
				'''
					only post data to the database if there doesnt exist a duplicate data
				'''
				return {"status":"200OK","error":"duplicate"},201
			else:
				x = DBCONNECTION.mycol.insert_one(data)
				return {"status":"200OK","error":None},201
		except:
			return {"status":"403NOTOK","error":"internal network error"},503	


class ExamSorter(Resource):
	def get(self):
		# try:

			DBCONNECTION.collection("sortedlayouts")
			mydoc=DBCONNECTION.mycol.find()
			
			for data in mydoc:
				pass
			
			return jsonify({"status":"200OK","error":None,"data":data["sortedData"]})
		# except:
		# 	return {"status":"503","error":"internal network error"}	

	def post(self):
		try:
			data = request.get_json()
			subject_codes=data["subjectcode"]
			classnumbers=data["classnumbers"]
			query=[]
			for number in classnumbers:
				query.append({"classnumber":number})
			print(query)
			'''
			using the or operator in mongodb to find the data
			'''

			mydoc = DBCONNECTION.mycol.find({"$or":query})
			querydata=[]
			for x in mydoc:
				querydata.append(x)
			
			array=sorter(querydata,subject_codes)
			DBCONNECTION.collection("sortedlayouts")
			DBCONNECTION.mycol.drop()
			x = DBCONNECTION.mycol.insert_one({"sortedData":array})
			return {"status":"200OK","error":None}
		except:
			return	{"status":"503","error":"internal network error"}
		



api.add_resource(LayoutPost, '/')
api.add_resource(ExamSorter,'/sort')

if __name__ == '__main__':
	app.run(debug = True)
