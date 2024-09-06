"""empty message

Revision ID: 47df1c4344b5
Revises: b02474a33cda
Create Date: 2024-09-05 20:33:55.905599

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '47df1c4344b5'
down_revision = 'b02474a33cda'
branch_labels = None
depends_on = None


def upgrade():
    # Add the gender column allowing NULL values
    with op.batch_alter_table('caregiver', schema=None) as batch_op:
        batch_op.add_column(sa.Column('gender', sa.String(length=10), nullable=True))

def downgrade():
    with op.batch_alter_table('caregiver', schema=None) as batch_op:
        batch_op.drop_column('gender')

    # ### end Alembic commands ###
