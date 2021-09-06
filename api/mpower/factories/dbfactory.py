from mpower.infrastructure.jsondb import JsonDb

def get_db(dbType):
    if (dbType == 'jsondb'):
        return JsonDb()
