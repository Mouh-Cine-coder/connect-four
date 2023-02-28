# print([0 for _ in range(7)])
# print(1 << 8)
# print(4 << 6)

# import asyncio

# event = {
#             "type": "play",
#             "player": player,
#             "column": event["column"],
#             "row": row,
#         }

# event = {
#                 "type": "error",
#                 "message": str(err),
#             }

# event = {
#                 "type": "win",
#                 "player": game.winner,
#             }
# import secrets
# JOIN = {}

# key_join = secrets.token_urlsafe(12)
# print(key_join)
# nameLabel = "name"
# name = "mouhcine"

# JOIN[key_join] = name, nameLabel
# print(JOIN)

y = 1.
print(type(y))  
# if  y<1. :
#     print("test")
# else:
#     print("test3")
JOIN = {}

def initilize_variable():
    key = "this is first key"
    key_number = 1
    key_name = "mouhcine key"
    JOIN[key_name] = key_number, key

def add_to_key(pass_key):
    try:
        new_key_number, new_key = JOIN[pass_key]
    except KeyError as ke:
        print("error", ke)
        return
    print("key accessed with success")

initilize_variable()
add_to_key("hello world")
add_to_key("mouhcine key")