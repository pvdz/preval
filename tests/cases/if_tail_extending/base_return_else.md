# Preval test case

# base_return_else.md

> If tail extending > Base return else
>
> Break should also flip

## Input

`````js filename=intro
const x = $();
function f() {
  while (x) {
    $(1);
    if ($) {
    } else {
      return;
    }
    $(2);
  }
}
f();
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $();
if (x) {
  $(1);
  if ($) {
    while ($LOOP_UNROLL_10) {
      $(2);
      $(1);
      if ($) {
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($()) {
  $(1);
  if ($) {
    while (true) {
      $(2);
      $(1);
      if (!$) {
        break;
      }
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
if (a) {
  $( 1 );
  if ($) {
    while ($LOOP_UNROLL_10) {
      $( 2 );
      $( 1 );
      if ($) {

      }
      else {
        break;
      }
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
