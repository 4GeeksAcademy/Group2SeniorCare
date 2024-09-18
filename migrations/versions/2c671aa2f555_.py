"""empty message

Revision ID: 2c671aa2f555
Revises: 8bb0a5187991
Create Date: 2024-09-18 00:17:25.698941

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c671aa2f555'
down_revision = '8bb0a5187991'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caregiver', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fullname', sa.String(length=64), nullable=False))
        batch_op.drop_constraint('caregiver_fullName_key', type_='unique')
        batch_op.create_unique_constraint(None, ['fullname'])
        batch_op.drop_column('fullName')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('caregiver', schema=None) as batch_op:
        batch_op.add_column(sa.Column('fullName', sa.VARCHAR(length=64), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.create_unique_constraint('caregiver_fullName_key', ['fullName'])
        batch_op.drop_column('fullname')

    # ### end Alembic commands ###
