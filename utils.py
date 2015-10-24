def to_dict(row):
    """
    Convert a SQLAlchemy row to python dict
    If the row contains a PostgreSQL date value, convert it to str
    """
    d = {}
    for c in row.__table__.columns:
        if c.name != 'date':
            d[c.name] = getattr(row, c.name)
        elif c.name == 'date' and getattr(row, 'date'):
          d['date'] = getattr(row, 'date').strftime('%m/%d/%Y')

    return d

def success(result, status=200):
    """
    Successful response format for API requests
    """
    response =  {
        'status': status,
        'result': result
    }
    return response

