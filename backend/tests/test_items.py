from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_list_items():
    response = client.get("/items/")
    assert response.status_code == 200
