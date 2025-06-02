# Preval test case

# nested.md

> Is booly > Nested

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
const tmpBool /*:boolean*/ = !$;
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
