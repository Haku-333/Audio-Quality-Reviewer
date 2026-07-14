from fastapi import FastAPI

app = FastAPI(title="Audio Quality Reviewer API")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Audio Quality Reviewer API"}
