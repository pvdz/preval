# Preval test case

# simple_conditional_return.md

> Normalize > Switch > Simple abrupt cases > Simple conditional return
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

#TODO

## Input

`````js filename=intro
function f() {
  switch ($(1)) {
    case 0:
      $('one');
      if($(1)) {
        return;
      }
      // fall-through
    case 1:
      $('two');
      break;
    case 2:
      $('three');
      break;
    case 3:
      $('four');
      break;
    default:
      $('def');
  }  
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    const tmpSwitchValue = $(1);
    let tmpSwitchCaseToStart = 4;
    if (0 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
    else if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 1;
    else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
    else if (3 === tmpSwitchValue) tmpSwitchCaseToStart = 3;
    else;
    tmpSwitchBreak: {
      if (tmpSwitchCaseToStart <= 0) {
        $(`one`);
        if ($(1)) {
          return;
        }
      }
      if (tmpSwitchCaseToStart <= 1) {
        $(`two`);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 2) {
        $(`three`);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 3) {
        $(`four`);
        break tmpSwitchBreak;
      }
      if (tmpSwitchCaseToStart <= 4) {
        $(`def`);
      }
    }
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$3 = 2 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpIfTest$5 = 3 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
        }
      }
    }
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(`one`);
    const tmpIfTest$9 = $(1);
    if (tmpIfTest$9) {
      return undefined;
    } else {
    }
  } else {
  }
  const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$11) {
    $(`two`);
    return undefined;
  } else {
    const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$13) {
      $(`three`);
      return undefined;
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
      if (tmpIfTest$15) {
        $(`four`);
        return undefined;
      } else {
        const tmpIfTest$17 = tmpSwitchCaseToStart <= 4;
        if (tmpIfTest$17) {
          $(`def`);
          return undefined;
        } else {
          return undefined;
        }
      }
    }
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$inlinedFunction: {
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 4;
  const tmpIfTest = 0 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 1 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 1;
    } else {
      const tmpIfTest$3 = 2 === tmpSwitchValue;
      if (tmpIfTest$3) {
        tmpSwitchCaseToStart = 2;
      } else {
        const tmpIfTest$5 = 3 === tmpSwitchValue;
        if (tmpIfTest$5) {
          tmpSwitchCaseToStart = 3;
        } else {
        }
      }
    }
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$7) {
    $(`one`);
    const tmpIfTest$9 = $(1);
    if (tmpIfTest$9) {
      break $inlinedFunction;
    } else {
    }
  } else {
  }
  const tmpIfTest$11 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$11) {
    $(`two`);
  } else {
    const tmpIfTest$13 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$13) {
      $(`three`);
    } else {
      const tmpIfTest$15 = tmpSwitchCaseToStart <= 3;
      if (tmpIfTest$15) {
        $(`four`);
      } else {
        $(`def`);
      }
    }
  }
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$inlinedFunction: {
  const a = $( 1 );
  let b = 4;
  const c = 0 === a;
  if (c) {
    b = 0;
  }
  else {
    const d = 1 === a;
    if (d) {
      b = 1;
    }
    else {
      const e = 2 === a;
      if (e) {
        b = 2;
      }
      else {
        const f = 3 === a;
        if (f) {
          b = 3;
        }
      }
    }
  }
  const g = b <= 0;
  if (g) {
    $( "one" );
    const h = $( 1 );
    if (h) {
      break $inlinedFunction;
    }
  }
  const i = b <= 1;
  if (i) {
    $( "two" );
  }
  else {
    const j = b <= 2;
    if (j) {
      $( "three" );
    }
    else {
      const k = b <= 3;
      if (k) {
        $( "four" );
      }
      else {
        $( "def" );
      }
    }
  }
}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'two'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
