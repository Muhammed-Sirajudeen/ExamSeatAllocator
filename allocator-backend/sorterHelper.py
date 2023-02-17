import pandas as pd
from database import DatabaseConnection
DBCONNECTION=DatabaseConnection("seatdb","layouts")
DBCOLLECTION=DBCONNECTION.connection()
doc=DBCOLLECTION.find()
def sorter():
    CODES=[3041,3042,3043]
    DATA=[]
    flag=0
    datapointer={}
    sortedArray=[]
    for x in CODES:
        datapointer[str(x)]=None
    for x in doc:
        sortedData={}
        flag=0
        # print(x["classnumber"])
        sortedData["classnumber"]=x["classnumber"]
        entireseatArray=[]
        for data in x["seats"]:
            
            # print(data["column"])
            
            seatData={}
            seatArray=[]
            seatData["column"]=data["column"]
            for seats in data["seats"]:
                # print(seats)
                
                try:
                    pointer=str(CODES[flag])
                except:
                    flag=0
                    pointer=str(CODES[flag])
                try:
                    if(datapointer[pointer]==None):
                        datapointer[pointer]=0
                        df=pd.read_csv(str(CODES[flag])+".csv")
                        df=df.loc[datapointer[pointer]]
                        print(df["Register No"])
                        print(seats)
                        seatArray.append(str(df["Register No"])+" "+seats)
                        
                    else:
                        datapointer[pointer]=datapointer[pointer]+1
                        df=pd.read_csv(str(CODES[flag])+".csv")
                        df=df.loc[datapointer[pointer]]
                        print(df["Register No"])
                        print(seats)
                        seatArray.append(str(df["Register No"])+" "+seats)
                    
                except:
                    flag=0
                    df=pd.read_csv(str(CODES[flag])+".csv")
            flag=flag+1
            object={
                "column":data["column"],
                "seats":seatArray
            }
            entireseatArray.append(object)
        sortedData["seats"]=entireseatArray
        sortedArray.append(sortedData)
    return sortedArray