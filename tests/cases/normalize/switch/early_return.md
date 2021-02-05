# Preval test case

# early_return.md

> normalize > switch > early_return
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
        $(3);
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$2 = tmpFallthrough;
    if (tmpIfTest$2) {
    } else {
      const tmpBinBothLhs$1 = tmpSwitchTest;
      const tmpBinBothRhs$1 = $(4);
      tmpIfTest$2 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    }
    if (tmpIfTest$2) {
      ('case 2:');
      {
        $(5);
        const tmpReturnArg = $(6);
        return tmpReturnArg;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$3 = tmpFallthrough;
    if (tmpIfTest$3) {
    } else {
      const tmpBinBothLhs$2 = tmpSwitchTest;
      const tmpBinBothRhs$2 = $(7);
      tmpIfTest$3 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
    }
    if (tmpIfTest$3) {
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
        $(3);
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$2 = tmpFallthrough;
    if (tmpIfTest$2) {
    } else {
      const tmpBinBothLhs$1 = tmpSwitchTest;
      const tmpBinBothRhs$1 = $(4);
      tmpIfTest$2 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
    }
    if (tmpIfTest$2) {
      ('case 2:');
      {
        $(5);
        const tmpReturnArg = $(6);
        return tmpReturnArg;
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$3 = tmpFallthrough;
    if (tmpIfTest$3) {
    } else {
      const tmpBinBothLhs$2 = tmpSwitchTest;
      const tmpBinBothRhs$2 = $(7);
      tmpIfTest$3 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
    }
    if (tmpIfTest$3) {
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
 - 3: 3
 - 4: 5
 - 5: 6
 - 6: 6
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
