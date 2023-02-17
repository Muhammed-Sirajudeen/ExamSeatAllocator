import pymongo
import os
class DatabaseConnection():
	'''
		Initiated a class for reusing database connection and to work with multiple databases in future
	'''
	def __init__(self,dbname,collection) -> None:
		self.url=os.getenv('MONGODB_URL')
		self.dbname=dbname
		self.collection=collection

	def connection(self) -> object:
		myclient = pymongo.MongoClient(self.url)
		mydb = myclient[self.dbname]
		mycol=mydb[self.collection]
		return mycol