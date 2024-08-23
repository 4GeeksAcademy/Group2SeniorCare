"""empty message

Revision ID: 8bb0a5187991
Revises: 
Create Date: 2024-09-17 23:12:06.961119

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8bb0a5187991'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('caregiver',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('fullName', sa.String(length=64), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=10), nullable=False),
    sa.Column('experience', sa.String(length=120), nullable=False),
    sa.Column('qualifications', sa.String(length=120), nullable=False),
    sa.Column('availability', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('location', sa.String(length=120), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('availability'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('experience'),
    sa.UniqueConstraint('fullName'),
    sa.UniqueConstraint('phone'),
    sa.UniqueConstraint('qualifications')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('date_of_birth', sa.Date(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('phone', sa.String(length=120), nullable=True),
    sa.Column('emergencyContact', sa.String(length=120), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('allergies', sa.String(length=120), nullable=True),
    sa.Column('bloodType', sa.String(length=120), nullable=True),
    sa.Column('hobbies', sa.String(length=300), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('caring_caregiver_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['caring_caregiver_id'], ['caregiver.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('user_request_caregiver',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('caregiver_id', sa.Integer(), nullable=False),
    sa.Column('request_status', sa.String(length=80), nullable=False),
    sa.Column('request_time', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['caregiver_id'], ['caregiver.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_request_caregiver')
    op.drop_table('user')
    op.drop_table('caregiver')
    # ### end Alembic commands ###