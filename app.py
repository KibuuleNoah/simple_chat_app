from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, send, socketio, emit
from flask import request

app = Flask(__name__)
app.config["SECRET_KEY"] = "xolxiegusu"
socketio = SocketIO(app)
# socketio.init_app(app)

users = {}


@app.route("/")
def index():
    return render_template("index.html")


@socketio.on("connect")
def handle_connection():
    pass


@socketio.on("user_join")
def user_join(name):
    users[request.sid] = name
    print("user: ", name, "joined")


@socketio.on("message")
def handle_msg(msg):
    print("message: ", msg)
    print("user: ", users[request.sid])
    emit("message", {"userName": users[request.sid], "message": msg}, broadcast=True)


@socketio.on("test")
def Test(msg):
    print()
    print(msg)
    print()


if __name__ == "__main__":
    socketio.run(app)
