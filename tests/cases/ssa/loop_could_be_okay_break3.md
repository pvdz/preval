# Preval test case

# loop_could_be_okay_break3.md

> Ssa > Loop could be okay break3
>
> Example of technical case where SSA is possible

- there is a write before any read in the loop
- there is no further read

The conditional break introduces branching which prevents any SSA in the first place.

#TODO

## Input

`````js filename=intro
let f = function () {
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
};
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (tmpLoopRetCode) {
    tmpLoopBody();
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
  let tmpLoopRetValue = undefined;
  let tmpLoopBody = function () {
    debugger;
    x = $(2);
    $(x);
    if ($) {
      tmpLoopRetCode = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  while (true) {
    if (tmpLoopRetCode) {
      tmpLoopBody();
    } else {
      break;
    }
  }
  return undefined;
};
f();
`````

## Output


`````js filename=intro
$(1);
let tmpLoopRetCode = true;
const tmpssa2_x = $(2);
$(tmpssa2_x);
let $tmpLoopUnrollCheck = false;
if ($) {
  tmpLoopRetCode = false;
} else {
  $tmpLoopUnrollCheck = tmpLoopRetCode;
}
if (tmpLoopRetCode) {
  const tmpssa2_x$1 = $(2);
  $(tmpssa2_x$1);
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpLoopRetCode) {
      const tmpssa2_x$2 = $(2);
      $(tmpssa2_x$2);
      if ($) {
        tmpLoopRetCode = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
let a = true;
const b = $( 2 );
$( b );
let c = false;
if ($) {
  a = false;
}
else {
  c = a;
}
if (a) {
  const d = $( 2 );
  $( d );
  if ($) {
    a = false;
  }
}
if (c) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      const e = $( 2 );
      $( e );
      if ($) {
        a = false;
      }
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
