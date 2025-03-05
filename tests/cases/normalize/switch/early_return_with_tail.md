# Preval test case

# early_return_with_tail.md

> Normalize > Switch > Early return with tail
>
> Sorting out the branching stuff

## Input

`````js filename=intro
function f() {
  switch ($(7)) {
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
  $('after');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(7);
    let tmpSwitchCaseToStart = 4;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if ($(4) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else if ($(7) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(2);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 1) {
        $(3);
      }
      if (tmpSwitchCaseToStart <= 2) {
        $(5);
        return $(6);
      }
      if (tmpSwitchCaseToStart <= 3) {
        break tmpSwitchBreak;
      }
    }
  }
  $(`after`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(7);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  tmpSwitchBreak: {
    if (tmpIfTest) {
      tmpSwitchCaseToStart = 0;
    } else {
      const tmpBinLhs = $(1);
      const tmpIfTest$1 = tmpBinLhs === tmpSwitchValue;
      if (tmpIfTest$1) {
        tmpSwitchCaseToStart = 1;
      } else {
        const tmpBinLhs$1 = $(4);
        const tmpIfTest$3 = tmpBinLhs$1 === tmpSwitchValue;
        if (tmpIfTest$3) {
          tmpSwitchCaseToStart = 2;
        } else {
          const tmpBinLhs$3 = $(7);
          const tmpIfTest$5 = tmpBinLhs$3 === tmpSwitchValue;
          if (tmpIfTest$5) {
            tmpSwitchCaseToStart = 3;
          } else {
          }
        }
      }
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$7) {
      $(2);
      break tmpSwitchBreak;
    } else {
      const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
      if (tmpIfTest$9) {
        $(3);
      } else {
      }
      const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
      if (tmpIfTest$11) {
        $(5);
        const tmpReturnArg = $(6);
        return tmpReturnArg;
      } else {
        const tmpIfTest$13 = tmpSwitchCaseToStart <= 3;
        if (tmpIfTest$13) {
          break tmpSwitchBreak;
        } else {
        }
      }
    }
  }
  $(`after`);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
$inlinedFunction: {
  const tmpSwitchValue /*:unknown*/ = $(7);
  let tmpSwitchCaseToStart /*:number*/ = 4;
  const tmpIfTest /*:boolean*/ = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpBinLhs /*:unknown*/ = $(1);
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpBinLhs$1 /*:unknown*/ = $(4);
      const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$1 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpBinLhs$3 /*:unknown*/ = $(7);
        const tmpIfTest$5 /*:boolean*/ = tmpBinLhs$3 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
        }
      }
    }
  }
  const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(2);
  } else {
    const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$9) {
      $(3);
    } else {
    }
    const tmpIfTest$11 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$11) {
      $(5);
      const tmpReturnArg /*:unknown*/ = $(6);
      tmpCalleeParam = tmpReturnArg;
      break $inlinedFunction;
    } else {
    }
  }
  $(`after`);
}
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  const b = $( 7 );
  let c = 4;
  const d = 0 === b;
  if (d) {
    c = 0;
  }
  else {
    const e = $( 1 );
    const f = e === b;
    if (f) {
      c = 1;
    }
    else {
      const g = $( 4 );
      const h = g === b;
      if (h) {
        c = 2;
      }
      else {
        const i = $( 7 );
        const j = i === b;
        if (j) {
          c = 3;
        }
      }
    }
  }
  const k = c <= 0;
  if (k) {
    $( 2 );
  }
  else {
    const l = c <= 1;
    if (l) {
      $( 3 );
    }
    const m = c <= 2;
    if (m) {
      $( 5 );
      const n = $( 6 );
      a = n;
      break $inlinedFunction;
    }
  }
  $( "after" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7
 - 2: 1
 - 3: 4
 - 4: 7
 - 5: 'after'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
