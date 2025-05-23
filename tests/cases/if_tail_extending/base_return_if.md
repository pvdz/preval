# Preval test case

# base_return_if.md

> If tail extending > Base return if
>
> Break should also flip

## Input

`````js filename=intro
function f() {
  while (x) {
    $(1);
    if ($) {
      return;
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
    while ($LOOP_UNROLL_10) {
      if (x) {
        $(1);
        if ($) {
          break;
        } else {
          $(2);
        }
      } else {
        break;
      }
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
    while (true) {
      if (x) {
        $(1);
        if ($) {
          break;
        } else {
          $(2);
        }
      } else {
        break;
      }
    }
  }
}
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
    while ($LOOP_UNROLL_10) {
      if (x) {
        $( 1 );
        if ($) {
          break;
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
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    if (x) {
      $(1);
      if ($) {
        return undefined;
      } else {
        $(2);
      }
    } else {
      break;
    }
  }
  return undefined;
};
f();
`````


## Todos triggered


None


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
