from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import torch
import pinecone
import csv

def docs(input_text):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model = SentenceTransformer('all-MiniLM-L6-v2', device=device)
    api_key = "d9b7dbe2-d68d-4381-937d-06ddb5cd761c"
    env = "asia-southeast1-gcp-free"
    pinecone.init(
        api_key=api_key,
        environment=env
    )
    index_name = 'semantic-search'
    # now connect to the index
    index = pinecone.GRPCIndex(index_name)
    # create the query vector
    xq = model.encode(input_text).tolist()
    # now query
    xc = index.query(xq, top_k=5, include_metadata=True)
    return xc

def extract_data(query):
    req_ids = []
    i=0
    output_data = docs(query)
    for k in output_data['matches']:
        req_ids.append(k["id"])
    print(req_ids)
    data_send = {}
    for k in req_ids:
        with open("file1.csv", 'r',encoding="utf-8") as csvfile:
            data = csv.reader(csvfile)
            for lines in data:
                if(lines == [] or lines[0] == "id"):
                    continue
                if (lines[1] != "" and lines[0] == k):
                    data_send[i] = {'id':lines[0],  'links' : lines[1],'titles': lines[2], 'category' : lines[3], 'image_links' : lines[4],'synopsis' : lines[5]}
                    i=i+1
    return data_send

# final = extract_data('Soviet Union')
# print(final)