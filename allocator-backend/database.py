import pymongo
import os
class DatabaseConnection():
	'''
		Initiated a class for reusing database connection and to work with multiple databases in future
		
	'''
	def __init__(self,dbname) -> None:
		self.url=os.getenv('MONGODB_URL')
		self.dbname=dbname
		self.mydb=None
		self.mycol=None
		

	def connection(self) -> object:
		myclient = pymongo.MongoClient(self.url)
		self.mydb = myclient[self.dbname]
	
	def collection(self,collection):
		mycol=self.mydb[collection]
		self.mycol=mycol