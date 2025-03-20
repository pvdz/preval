# Preval test case

# labeled_break4.md

> Assigns > Labeled break4
>
> Breaking to labels may be funky for ref tracking

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      break foo;
    } else {
      x = 20;
    }
    $(x); // can observe only the 20
  }
  $(x); // CAN observe the 10, 20
}
`````


## Settled


`````js filename=intro
if ($) {
  $(10);
} else {
  $(20);
  $(20);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(10);
} else {
  $(20);
  $(20);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 10 );
}
else {
  $( 20 );
  $( 20 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
