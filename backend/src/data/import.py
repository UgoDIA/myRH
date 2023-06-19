import pandas as pd
from sqlalchemy import create_engine

conn= 'postgresql://postgres:0000@localhost:5432/myrh'

engine=create_engine(conn)

df = pd.read_csv('emp.csv')

df.fillna('Non renseigné',inplace=True)

df.rename(columns={'first_name':'prenom',"last_name":"nom","gender":"sexe","phone_number":"tel",
                   "email":"email_pro","email_personnal":"email_perso"},inplace = True)

df.to_sql("emp",engine,if_exists="append",index=False)