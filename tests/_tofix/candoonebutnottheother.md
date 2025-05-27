# Preval test case

# candoonebutnottheother.md

> Tofix > candoonebutnottheother

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
if ($) {
  $(false, false);
} else {
  const tmpClusterSSA_x /*:boolean*/ = !$;
  $(tmpClusterSSA_x, true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(false, false);
} else {
  $(!$, true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( false, false );
}
else {
  const a = !$;
  $( a, true );
}
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
