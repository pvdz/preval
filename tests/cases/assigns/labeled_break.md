# Preval test case

# labeled_break.md

> Assigns > Labeled break
>
> Breaking to labels may be funky for ref tracking

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      x = 20;
      break foo;
    }
    $(x); // can NOT observe the 20 (ignoring that it is dead code)
  }
  $(x); // CAN observe the 20
}
`````


## Settled


`````js filename=intro
if ($) {
  $(20);
} else {
  $(10);
  $(10);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(20);
} else {
  $(10);
  $(10);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 20 );
}
else {
  $( 10 );
  $( 10 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
foo: {
  if ($) {
    x = 20;
    break foo;
  } else {
    $(x);
  }
}
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
