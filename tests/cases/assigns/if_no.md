# Preval test case

# if_no.md

> Assigns > If no
>
> One branch write

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x);
  } else {
    $(x);
    x = 2;
  }
  $(x); // observes 1 or 2
}
`````


## Settled


`````js filename=intro
$(1);
if ($) {
  $(1);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($) {
  $(1);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
if ($) {
  $( 1 );
}
else {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
