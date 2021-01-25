# Preval test case

# odd_early_return.md

> normalize > switch > odd_early_return
>
> Sorting out the branching stuff

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1)) {                         
    case 0:                               
      $(2);                               
      break;                              
    case $(1):                            
      if ($(8)) {                         
        if ($(9)) {                       
          return $(10);                   
        } else {                          
          $(11);                          
        }

        if ($(2)) {
          $(13);
        } else {
          return $(14);
        }
      }
      $(3);
    case $(4):
      $(5);
      return $(6);
    case $(7):
      break;
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpBinaryLeft;
  var tmpBinaryLeft$1;
  var tmpBinaryLeft$2;
  var tmpBinaryRight;
  var tmpBinaryRight$1;
  var tmpBinaryRight$2;
  const tmpSwitchTest = $(1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = tmpSwitchTest === 0;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        $(2);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$1 = tmpFallthrough;
    if (tmpIfTest$1) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $(1);
      tmpIfTest$1 = tmpBinaryLeft === tmpBinaryRight;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        const tmpIfTest$2 = $(8);
        if (tmpIfTest$2) {
          const tmpIfTest$3 = $(9);
          if (tmpIfTest$3) {
            let tmpReturnArg = $(10);
            return tmpReturnArg;
          } else {
            $(11);
          }
          const tmpIfTest$4 = $(2);
          if (tmpIfTest$4) {
            $(13);
          } else {
            let tmpReturnArg$1 = $(14);
            return tmpReturnArg$1;
          }
        }
        $(3);
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$5 = tmpFallthrough;
    if (tmpIfTest$5) {
    } else {
      tmpBinaryLeft$1 = tmpSwitchTest;
      tmpBinaryRight$1 = $(4);
      tmpIfTest$5 = tmpBinaryLeft$1 === tmpBinaryRight$1;
    }
    if (tmpIfTest$5) {
      ('case 2:');
      {
        $(5);
        let tmpReturnArg$2 = $(6);
        return tmpReturnArg$2;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$6 = tmpFallthrough;
    if (tmpIfTest$6) {
    } else {
      tmpBinaryLeft$2 = tmpSwitchTest;
      tmpBinaryRight$2 = $(7);
      tmpIfTest$6 = tmpBinaryLeft$2 === tmpBinaryRight$2;
    }
    if (tmpIfTest$6) {
      ('case 3:');
      {
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
var tmpArg;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = tmpSwitchTest === 0;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        $(2);
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$1 = tmpFallthrough;
    if (tmpIfTest$1) {
    } else {
      tmpBinaryLeft = tmpSwitchTest;
      tmpBinaryRight = $(1);
      tmpIfTest$1 = tmpBinaryLeft === tmpBinaryRight;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        const tmpIfTest$2 = $(8);
        if (tmpIfTest$2) {
          const tmpIfTest$3 = $(9);
          if (tmpIfTest$3) {
            let tmpReturnArg = $(10);
            return tmpReturnArg;
          } else {
            $(11);
          }
          const tmpIfTest$4 = $(2);
          if (tmpIfTest$4) {
            $(13);
          } else {
            let tmpReturnArg$1 = $(14);
            return tmpReturnArg$1;
          }
        }
        $(3);
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$5 = tmpFallthrough;
    if (tmpIfTest$5) {
    } else {
      tmpBinaryLeft$1 = tmpSwitchTest;
      tmpBinaryRight$1 = $(4);
      tmpIfTest$5 = tmpBinaryLeft$1 === tmpBinaryRight$1;
    }
    if (tmpIfTest$5) {
      ('case 2:');
      {
        $(5);
        let tmpReturnArg$2 = $(6);
        return tmpReturnArg$2;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$6 = tmpFallthrough;
    if (tmpIfTest$6) {
    } else {
      tmpBinaryLeft$2 = tmpSwitchTest;
      tmpBinaryRight$2 = $(7);
      tmpIfTest$6 = tmpBinaryLeft$2 === tmpBinaryRight$2;
    }
    if (tmpIfTest$6) {
      ('case 3:');
      {
        break tmpSwitchBreak;
      }
      tmpFallthrough = true;
    }
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 1
 - 2: 8
 - 3: 9
 - 4: 10
 - 5: 10
 - 6: undefined

Normalized calls: Same

Final output calls: BAD!!
[[1], '<crash[ <ref> is not defined ]>'];

