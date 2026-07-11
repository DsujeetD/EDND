from fastapi import FastAPI, APIRouter
from fastapi.responses import Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StaffRequestCreate(BaseModel):
    service: str
    city: str
    quantity: int
    date: str
    name: str
    phone: str
    email: Optional[str] = None
    brief: Optional[str] = None


class StaffRequest(StaffRequestCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str


class ContactEnquiry(ContactCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "EDND Services API"}


@api_router.post("/staff-requests", response_model=StaffRequest)
async def create_staff_request(payload: StaffRequestCreate):
    obj = StaffRequest(**payload.model_dump())
    await db.staff_requests.insert_one(obj.model_dump())
    return obj


@api_router.get("/staff-requests", response_model=List[StaffRequest])
async def list_staff_requests():
    docs = await db.staff_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.post("/contact", response_model=ContactEnquiry)
async def create_contact(payload: ContactCreate):
    obj = ContactEnquiry(**payload.model_dump())
    await db.contact_enquiries.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[ContactEnquiry])
async def list_contacts():
    docs = await db.contact_enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.get("/download-source")
async def download_source():
    from source_export import build_source_zip
    data = build_source_zip()
    return Response(
        content=data,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=ednd-services-source.zip"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
