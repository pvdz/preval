# Preval test case

# func_clone.md

> Normalize > Continue > Func clone
>
> There was a problem when cloning functions

## Input

`````js filename=intro
function f() {
  label: while ($) {
    $(1);
    if ($) {
      continue label;
    }
  }
}
$(f());
`````

## Settled


`````js filename=intro
if ($) {
  while ($LOOP_UNROLL_10) {
    $(1);
    if ($) {
    } else {
      break;
    }
  }
  $(undefined);
} else {
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  while (true) {
    $(1);
    if (!$) {
      break;
    }
  }
  $(undefined);
} else {
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  label: while ($) {
    $continue: {
      {
        $(1);
        if ($) {
          break $continue;
        }
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
  while (true) {
    if ($) {
      $continue: {
        $(1);
        if ($) {
          break $continue;
        } else {
        }
      }
    } else {
      break;
    }
  }
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    if ($) {

    }
    else {
      break;
    }
  }
  $( undefined );
}
else {
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support referencing this builtin in isFree: $
