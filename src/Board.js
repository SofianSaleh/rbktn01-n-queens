// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var temp = 0;

      for (var i = 0; i < this.attributes.n; i++) {
        if(this.attributes[rowIndex][i] === 1){ 
             temp++
             if(temp > 1) {
              return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var result = false;
      for(var i = 0; i < this.attributes.n; i++) {
        result = result || this.hasRowConflictAt(i)
      }
      return result; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var temp = 0;
      
      for (var i = 0; i < this.attributes.n; i++) {
        if(this.attributes[i][colIndex] === 1){ 
             temp++
             if(temp > 1) {
              return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var result = false;
      for(var i = 0; i < this.attributes.n; i++) {
        result = result || this.hasColConflictAt(i)
      }
      return result; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
     var temp = 0;
     var major = majorDiagonalColumnIndexAtFirstRow;
     major = Math.max(major, 0)
     var size = this.get('n')
     console.log(size)
     for (var i = major; i < this.attributes.n; i++) {
      var row = i - major;
      
        if(this.attributes[row][i] === 1){
          temp++
             if(temp > 1) {
              return true;
            }    
        }
      }
        if(major === 0) {
       for(var j = 1; j < this.attributes.n; j++) {
           temp = 0;
           for (var k = major; k < this.attributes.n - j; k++) {
        if(this.attributes[k + j][k] === 1 ) {
          temp++
             
             if(temp > 1) {
              return true;
          }
        }

      }
       }
      
    }

      return false; // fixme
    
  },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
       var result = false;
      for(var i = 0; i < this.attributes.n; i++) {
        result = result || this.hasMajorDiagonalConflictAt(i)
      }
      return result; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    var temp = 0;
    var minor = minorDiagonalColumnIndexAtFirstRow;

     minor = Math.min(minor, this.attributes.n - 1)

     for (var i = minor; i >= 0; i--) {
      var col = minor - i ;
  
        if(this.attributes[col][i] === 1){
          temp++

             if(temp > 1) {
              return true;
            }    
        }
      }
      if(minor === (this.attributes.n - 1)){
       for(var j = 1; j < this.attributes.n; j++) {
           temp = 0;
           var row = j;
           for (var k = minor; k >= j; k--) {
        if(this.attributes[row][k] === 1 ){

          temp++
          
             if(temp > 1) { 
              return true;
            }
          } 
          row++
        }
       }
     }
      return false;
  },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
       var result = false;
      for(var i = (this.attributes.n - 1); i >= 0; i--) {
        result = result || this.hasMinorDiagonalConflictAt(i)
      }
      return result; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
