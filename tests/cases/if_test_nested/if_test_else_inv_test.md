# Preval test case

# if_test_else_inv_test.md

> If test nested > If test else inv test

This could be

if ($) {
  $(false, false);
} else {
  if ($) {
    $(false, true);
  } else {
    $(true, true);
  }
}

so it'll do $false,false) but not $(true,false) ? what's up wit that. it knows !$ is true

## Input

`````js filename=intro
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
  } else {
  }
} else {
  y = false;
}
$(x, y);
`````


## Settled


`````js filename=intro
const tmpBool /*:boolean*/ /*banged*/ = !$;
$(tmpBool, tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBool = !$;
$(tmpBool, tmpBool);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = !$;
$( a, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = true;
let x = !$;
if (x) {
  if ($) {
    x = false;
    $(x, y);
  } else {
    $(x, y);
  }
} else {
  y = false;
  $(x, y);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false, false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
