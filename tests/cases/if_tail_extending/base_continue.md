# Preval test case

# base_continue.md

> If tail extending > Base continue
>
> Break should also flip

## Input

`````js filename=intro
function f() {
  while (x) {
    $(1);
    if ($) {
      continue;
    }
    $(2);
  }
}
f();
`````

## Settled


`````js filename=intro
if (x) {
  $(1);
  if ($) {
  } else {
    $(2);
  }
  while ($LOOP_UNROLL_10) {
    if (x) {
      $(1);
      if ($) {
      } else {
        $(2);
      }
    } else {
      break;
    }
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (x) {
  $(1);
  if (!$) {
    $(2);
  }
  while (true) {
    if (x) {
      $(1);
      if (!$) {
        $(2);
      }
    } else {
      break;
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  while (x) {
    $continue: {
      {
        $(1);
        if ($) {
          break $continue;
        }
        $(2);
      }
    }
  }
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    if (x) {
      $continue: {
        $(1);
        if ($) {
          break $continue;
        } else {
          $(2);
        }
      }
    } else {
      break;
    }
  }
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
if (x) {
  $( 1 );
  if ($) {

  }
  else {
    $( 2 );
  }
  while ($LOOP_UNROLL_10) {
    if (x) {
      $( 1 );
      if ($) {

      }
      else {
        $( 2 );
      }
    }
    else {
      break;
    }
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- Support referencing this builtin in isFree: $
