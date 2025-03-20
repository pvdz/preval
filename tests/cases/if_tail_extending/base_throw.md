# Preval test case

# base_throw.md

> If tail extending > Base throw
>
> Break should also flip

## Input

`````js filename=intro
function f() {
  while (x) {
    $(1);
    if ($) {
      throw "error";
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
    throw `error`;
  } else {
    $(2);
    while ($LOOP_UNROLL_10) {
      if (x) {
        $(1);
        if ($) {
          throw `error`;
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
  if ($) {
    throw `error`;
  } else {
    $(2);
    while (true) {
      if (x) {
        $(1);
        if ($) {
          throw `error`;
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
    throw "error";
  }
  else {
    $( 2 );
    while ($LOOP_UNROLL_10) {
      if (x) {
        $( 1 );
        if ($) {
          throw "error";
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
