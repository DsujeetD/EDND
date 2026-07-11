import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://fullstack-builder-155.preview.emergentagent.com").rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health check
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# Staff requests: create + list + validation
class TestStaffRequests:
    def test_create_staff_request(self, client):
        payload = {
            "service": "TEST_Ushers",
            "city": "Mumbai",
            "quantity": 25,
            "date": "2026-06-01",
            "name": "TEST_John",
            "phone": "9999999999",
            "email": "test@example.com",
            "brief": "Test brief",
        }
        r = client.post(f"{API}/staff-requests", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and "created_at" in data
        assert data["service"] == payload["service"]
        assert data["quantity"] == 25
        pytest.created_id = data["id"]

    def test_list_staff_requests_sorted(self, client):
        r = client.get(f"{API}/staff-requests")
        assert r.status_code == 200
        arr = r.json()
        assert isinstance(arr, list)
        assert len(arr) >= 1
        ids = [x.get("id") for x in arr]
        assert getattr(pytest, "created_id", None) in ids
        # sort check
        created_dates = [x["created_at"] for x in arr]
        assert created_dates == sorted(created_dates, reverse=True)
        # ensure no _id leaking
        assert all("_id" not in x for x in arr)

    def test_staff_request_validation(self, client):
        r = client.post(f"{API}/staff-requests", json={"service": "X"})
        assert r.status_code == 422


# Contact: create + list + validation
class TestContact:
    def test_create_contact(self, client):
        payload = {
            "name": "TEST_Jane",
            "email": "jane@test.com",
            "phone": "1234567890",
            "message": "Hello from test",
        }
        r = client.post(f"{API}/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == "TEST_Jane"
        assert "id" in data
        pytest.contact_id = data["id"]

    def test_list_contacts(self, client):
        r = client.get(f"{API}/contact")
        assert r.status_code == 200
        arr = r.json()
        assert isinstance(arr, list)
        ids = [x.get("id") for x in arr]
        assert getattr(pytest, "contact_id", None) in ids
        assert all("_id" not in x for x in arr)

    def test_contact_validation(self, client):
        r = client.post(f"{API}/contact", json={"name": "only"})
        assert r.status_code == 422
