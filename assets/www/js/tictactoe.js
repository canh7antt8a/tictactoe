// Generated by CoffeeScript 1.6.2
(function() {
  var TicTacToe, _getBackSlash, _getCol, _getRow, _getSlash,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _getRow = function(idx) {
    var col, _i, _results;

    _results = [];
    for (col = _i = 1; _i <= 3; col = ++_i) {
      _results.push("" + idx + col);
    }
    return _results;
  };

  _getCol = function(idx) {
    var row, _i, _results;

    _results = [];
    for (row = _i = 1; _i <= 3; row = ++_i) {
      _results.push("" + row + idx);
    }
    return _results;
  };

  _getBackSlash = function() {
    var idx, _i, _results;

    _results = [];
    for (idx = _i = 1; _i <= 3; idx = ++_i) {
      _results.push("" + idx + idx);
    }
    return _results;
  };

  _getSlash = function() {
    var col, rows, _i, _results;

    rows = [1, 2, 3];
    _results = [];
    for (col = _i = 1; _i <= 3; col = ++_i) {
      _results.push("" + rows.pop() + col);
    }
    return _results;
  };

  TicTacToe = {
    init: function() {
      var idx, _i;

      this.board = {
        '11': "",
        '12': "",
        '13': "",
        '21': "",
        '22': "",
        '23': "",
        '31': "",
        '32': "",
        '33': ""
      };
      this.player = "X";
      this.rows2Check = [];
      for (idx = _i = 1; _i <= 3; idx = ++_i) {
        this.rows2Check.push(_getRow(idx));
        this.rows2Check.push(_getCol(idx));
      }
      this.rows2Check.push(_getSlash());
      this.rows2Check.push(_getBackSlash());
      this.drawBox();
      return this.winner = "";
    },
    boardIsFull: function() {
      var box, player, _ref;

      _ref = this.board;
      for (box in _ref) {
        player = _ref[box];
        if (!player) {
          return false;
        }
      }
      return true;
    },
    drawBox: function() {
      var box, classes, element, player, _ref, _results;

      _ref = this.board;
      _results = [];
      for (box in _ref) {
        player = _ref[box];
        element = document.getElementById(box);
        classes = element.className.split(" ");
        if (player && !(__indexOf.call(classes, player) >= 0)) {
          _results.push(element.className += " " + player);
        } else if (!player) {
          _results.push(element.className = "col");
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    mark: function(element) {
      if (this.winner || this.boardIsFull()) {
        return this.init();
      } else if (this.player === "O") {
        return navigator.notification.vibrate(500);
      } else {
        if (this.setBox(element.id)) {
          return navigator.notification.vibrate(100);
        } else {
          return navigator.notification.vibrate(500);
        }
      }
    },
    endTurn: function() {
      this.player = (this.player === "X" ? "O" : "X");
      this.check4Winner();
      this.drawBox();
      if (this.player === "O" && !this.winner) {
        return setTimeout(this.runBot, 1000);
      }
    },
    setBox: function(box) {
      if (!this.board[box]) {
        this.board[box] = this.player;
        this.endTurn();
        return true;
      } else {
        return false;
      }
    },
    runBot: function() {
      var action, arr, box, player, ret, _i, _len, _ref, _ref1;

      console.info("runBot");
      _ref = ["canWin", "canBlock"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        box = TicTacToe.bot[action]();
        if (box) {
          TicTacToe.setBox(box);
          return;
        }
      }
      if (TicTacToe.setBox("22")) {
        return;
      }
      arr = [];
      _ref1 = TicTacToe.board;
      for (box in _ref1) {
        player = _ref1[box];
        if (!player) {
          arr.push(box);
        }
      }
      if (arr) {
        box = arr[Math.floor(Math.random() * arr.length)];
        ret = TicTacToe.setBox(box);
        console.info(box, ret);
      }
    },
    bot: {
      check: function(row) {
        var box, key, ret, _i, _len;

        ret = {
          X: 0,
          X_list: [],
          O: 0,
          O_list: [],
          E: 0,
          E_list: []
        };
        for (_i = 0, _len = row.length; _i < _len; _i++) {
          box = row[_i];
          key = TicTacToe.board[box] ? TicTacToe.board[box] : "E";
          ret[key] += 1;
          ret[key + "_list"].push(box);
        }
        return ret;
      },
      canWin: function() {
        var info, row, _i, _len, _ref;

        _ref = TicTacToe.rows2Check;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          info = this.check(row);
          if (info["O"] === 2 && info["E"] === 1) {
            return info["E_list"][0];
          }
        }
      },
      canBlock: function() {
        var info, row, _i, _len, _ref;

        _ref = TicTacToe.rows2Check;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          info = this.check(row);
          if (info["X"] === 2 && info["E"] === 1) {
            return info["E_list"][0];
          }
        }
      }
    },
    toBlue: function(element) {
      element.className = element.className + " O";
      return navigator.notification.vibrate(100);
    },
    check4Winner: function() {
      var player, row, _i, _len, _ref, _results;

      _ref = this.rows2Check;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        row = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;

          _ref1 = ["X", "O"];
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            player = _ref1[_j];
            if (this.isWinner(player, row)) {
              this.setWinner(player, row);
              _results1.push(this.winner = player);
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    },
    isWinner: function(player, row) {
      var box, _i, _len;

      for (_i = 0, _len = row.length; _i < _len; _i++) {
        box = row[_i];
        if (!(player === this.board[box])) {
          return false;
        }
      }
      return true;
    },
    setWinner: function(player, row) {
      var box, element, _i, _len, _results;

      _results = [];
      for (_i = 0, _len = row.length; _i < _len; _i++) {
        box = row[_i];
        element = document.getElementById(box);
        _results.push(element.className += " Winner" + player);
      }
      return _results;
    }
  };

  TicTacToe.init();

  window.bar = TicTacToe;

  if (typeof navigator.notification === "undefined") {
    navigator.notification = {
      vibrate: function(foo) {}
    };
  }

}).call(this);