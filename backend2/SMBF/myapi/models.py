from django.db import models

import uuid
from typing import Optional
from pydantic import BaseModel, Field

class Book(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    user_email: str = Field(...)
    user_password: str = Field(...)

     # Copied this from MongoDB website so should probably take out. 
    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "_id": "066de609-b04a-4b30-b46c-32537c7f1f6e",
                "title": "Don Quixote",
                "author": "Miguel de Cervantes",
                "synopsis": "..."
            }
        }

    # Didn't think we needed a user update model since not updating username or password...can add
    # it in as needed from Mongo DB website. 