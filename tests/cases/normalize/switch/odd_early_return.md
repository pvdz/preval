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
      const tmpBinBothLhs = tmpSwitchTest;
      const tmpBinBothRhs = $(1);
      tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        const tmpIfTest$2 = $(8);
        if (tmpIfTest$2) {
          const tmpIfTest$3 = $(9);
          if (tmpIfTest$3) {
            const tmpReturnArg = $(10);
            return tmpReturnArg;
          } else {
            $(11);
          }
          const tmpIfTest$4 = $(2);
          if (tmpIfTest$4) {
            $(13);
          } else {
            const tmpReturnArg$1 = $(14);
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
      const tmpBinBothLhs$1 = tmpSwitchTest;
      const tmpBinBothRhs$1 = $(4);
      tmpIfTest$5 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    }
    if (tmpIfTest$5) {
      ('case 2:');
      {
        $(5);
        const tmpReturnArg$2 = $(6);
        return tmpReturnArg$2;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$6 = tmpFallthrough;
    if (tmpIfTest$6) {
    } else {
      const tmpBinBothLhs$2 = tmpSwitchTest;
      const tmpBinBothRhs$2 = $(7);
      tmpIfTest$6 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
      const tmpBinBothLhs = tmpSwitchTest;
      const tmpBinBothRhs = $(1);
      tmpIfTest$1 = tmpBinBothLhs === tmpBinBothRhs;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        const tmpIfTest$2 = $(8);
        if (tmpIfTest$2) {
          const tmpIfTest$3 = $(9);
          if (tmpIfTest$3) {
            const tmpReturnArg = $(10);
            return tmpReturnArg;
          } else {
            $(11);
          }
          const tmpIfTest$4 = $(2);
          if (tmpIfTest$4) {
            $(13);
          } else {
            const tmpReturnArg$1 = $(14);
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
      const tmpBinBothLhs$1 = tmpSwitchTest;
      const tmpBinBothRhs$1 = $(4);
      tmpIfTest$5 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    }
    if (tmpIfTest$5) {
      ('case 2:');
      {
        $(5);
        const tmpReturnArg$2 = $(6);
        return tmpReturnArg$2;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$6 = tmpFallthrough;
    if (tmpIfTest$6) {
    } else {
      const tmpBinBothLhs$2 = tmpSwitchTest;
      const tmpBinBothRhs$2 = $(7);
      tmpIfTest$6 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
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
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 8
 - 4: 9
 - 5: 10
 - 6: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
