var Vector;
(function (Vector) {
    var Vector2 = (function () {
        function Vector2(x, y) {
            this.x = x;
            this.y = y;
        }
        Vector2.prototype.add = function (v) {
            return new Vector2(this.x + v.x, this.y + v.y);
        };
        Vector2.prototype.difference = function (v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        };
        Vector2.prototype.scale = function (n) {
            return new Vector2(this.x * n, this.y * n);
        };
        Vector2.prototype.magnitude = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector2.prototype.normalize = function () {
            var mag = this.magnitude();
            return new Vector2(this.x / mag, this.y / mag);
        };
        Vector2.reflectX = function (point, x) {
            return new Vector2(2 * x - point.x, point.y);
        };
        Vector2.reflectY = function (point, y) {
            return new Vector2(point.x, 2 * y - point.y);
        };
        return Vector2;
    }());
    Vector.Vector2 = Vector2;
})(Vector || (Vector = {}));
var Vector;
(function (Vector) {
    var Rectangle = (function () {
        function Rectangle(p, w, h) {
            this.position = p;
            this.width = w;
            this.height = h;
        }
        Rectangle.prototype.isInside = function (point) {
            var difference = this.position.difference(point);
            return Math.abs(difference.x) < this.width / 2 && Math.abs(difference.y) < this.height / 2;
        };
        Rectangle.prototype.isOverlap = function (o2) {
            var difference = this.position.difference(o2.position);
            return Math.abs(difference.x) < this.width / 2 + o2.width / 2 && Math.abs(difference.y) < this.height / 2 + o2.height / 2;
        };
        return Rectangle;
    }());
    Vector.Rectangle = Rectangle;
})(Vector || (Vector = {}));
var Game;
(function (Game) {
    var v = Vector;
    var Snippets = (function () {
        function Snippets() {
            var vect = new v.Example();
            var dr = new Draggable.Example();
        }
        return Snippets;
    }());
    Game.Snippets = Snippets;
})(Game || (Game = {}));
window.addEventListener("load", function () { return new Game.Snippets(); });
var Draggable;
(function (Draggable) {
    var DragEvent = (function () {
        function DragEvent(e) {
            this.clientX = 0;
            this.clientY = 0;
            this.altKey = false;
            if (e.type != "touchmove" && e.type != "mousemove")
                console.log("EVENT " + e.type);
            switch (e.type) {
                case "mousedown":
                case "mouseup":
                case "mousemove":
                    var m = e;
                    this.clientX = m.clientX;
                    this.clientY = m.clientY;
                    this.altKey = m.altKey;
                    break;
                case "touchcancel":
                    console.log("TOUCH CANCEL");
                case "touchstart":
                case "touchmove":
                    var allTouches = e;
                    var t = allTouches.targetTouches[0];
                    this.clientX = t.clientX;
                    this.clientY = t.clientY;
                    break;
                case "touchend":
                    var all = e;
                    console.log("Touch end. Aantal touches: " + all.targetTouches.length);
                    break;
                default:
                    console.log("Unknown: " + e.type);
            }
        }
        return DragEvent;
    }());
    Draggable.DragEvent = DragEvent;
})(Draggable || (Draggable = {}));
var Draggable;
(function (Draggable) {
    var DraggableObject = (function () {
        function DraggableObject(x, y, HTMLtagName, offx, offy) {
            var _this = this;
            this.scale = 1;
            this.offSetX = 0;
            this.offSetY = 0;
            this.down = "mousedown";
            this.up = "mouseup";
            this.move = "mousemove";
            this.eventType = "mouseEvent";
            this.htmlElement = document.createElement(HTMLtagName);
            document.body.appendChild(this.htmlElement);
            this.checkTouchSupport();
            this.x = x;
            this.y = y;
            this.offSetX = offx;
            this.offSetY = offy;
            this.draw();
            this.moveBind = function (e) { return _this.updatePosition(e); };
            this.htmlElement.addEventListener(this.down, function (e) { return _this.initDrag(e); });
            this.htmlElement.addEventListener(this.up, function (e) { return _this.stopDrag(e); });
        }
        DraggableObject.prototype.initDrag = function (e) {
            e.preventDefault();
            var event = new Draggable.DragEvent(e);
            this.htmlElement.parentElement.appendChild(this.htmlElement);
            this.offSetX = event.clientX - this.x;
            this.offSetY = event.clientY - this.y;
            window.addEventListener(this.move, this.moveBind);
        };
        DraggableObject.prototype.updatePosition = function (e) {
            e.preventDefault();
            var event = new Draggable.DragEvent(e);
            this.x = event.clientX - this.offSetX;
            this.y = event.clientY - this.offSetY;
            this.draw();
        };
        DraggableObject.prototype.stopDrag = function (e) {
            window.removeEventListener(this.move, this.moveBind);
            e.preventDefault();
            console.log("STOP DRAG:  remove listener: " + this.move);
        };
        DraggableObject.prototype.draw = function () {
            this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.scale + ")";
        };
        DraggableObject.prototype.checkTouchSupport = function () {
            if ('ontouchstart' in window) {
                this.down = "touchstart";
                this.up = "touchend";
                this.move = "touchmove";
                this.eventType = "touchEvent";
            }
        };
        return DraggableObject;
    }());
    Draggable.DraggableObject = DraggableObject;
})(Draggable || (Draggable = {}));
var Draggable;
(function (Draggable) {
    var Example = (function () {
        function Example() {
            console.log("draggable example");
            var go = new Draggable.DraggableObject(120, 120, "brick", 0, 0);
        }
        return Example;
    }());
    Draggable.Example = Example;
})(Draggable || (Draggable = {}));
var Vector;
(function (Vector) {
    var Example = (function () {
        function Example() {
            console.log("vector example");
            var v1 = new Vector.Vector2(20, 35);
            var v2 = new Vector.Vector2(100, 120);
            v1 = v1.add(v2);
            console.log("Added v1 and v2: " + v1.x + "," + v1.y);
            var v3 = v1.difference(v2);
            console.log("Difference between: " + v1.x + "," + v1.y + " and " + v2.x + "," + v2.y + " is " + v3.x + "," + v3.y);
            var v5 = new Vector.Vector2(100, 100);
            console.log("Lengte van " + v5.x + "," + v5.y + " is " + v5.magnitude());
            var v6 = v5.normalize();
            console.log("Vector: " + v5.x + "," + v5.y + " normalized is " + v6.x + "," + v6.y);
            var r1 = new Vector.Rectangle(new Vector.Vector2(20, 20), 100, 100);
            var v7 = new Vector.Vector2(25, 25);
            var hit = r1.isInside(v7);
            console.log("Is vector " + v7.x + "," + v7.y + " inside " + r1.position.x + "," + r1.position.y + "," + r1.width + "," + r1.height + " = " + hit);
            var r2 = new Vector.Rectangle(new Vector.Vector2(30, 30), 200, 150);
            var hit2 = r1.isOverlap(r2);
            console.log("Does rectangle r1 overlap r2 ? " + hit);
        }
        return Example;
    }());
    Vector.Example = Example;
})(Vector || (Vector = {}));
//# sourceMappingURL=main.js.map