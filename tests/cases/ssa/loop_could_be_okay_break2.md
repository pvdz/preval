# Preval test case

# loop_could_be_okay_break2.md

> Ssa > Loop could be okay break2
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
if ($) {
  f();
} else {
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
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
if ($) {
  f();
} else {
}
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  let tmpLoopRetCode = true;
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
if ($) {
  f();
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  $(1);
  let tmpLoopRetCode = true;
  const tmpssa2_x = $(2);
  $(tmpssa2_x);
  if ($) {
    tmpLoopRetCode = false;
  } else {
  }
  if (tmpLoopRetCode) {
    while ($LOOP_UNROLL_10) {
      const tmpssa2_x$1 = $(2);
      $(tmpssa2_x$1);
      if ($) {
        tmpLoopRetCode = false;
      } else {
      }
      if (tmpLoopRetCode) {
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
  let a = true;
  const b = $( 2 );
  $( b );
  if ($) {
    a = false;
  }
  if (a) {
    while ($LOOP_UNROLL_10) {
      const c = $( 2 );
      $( c );
      if ($) {
        a = false;
      }
      if (a) {

      }
      else {
        break;
      }
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
