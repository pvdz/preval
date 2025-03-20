# Preval test case

# if_yes.md

> Assigns > If yes
>
> One branch write

## Input

`````js filename=intro
{
  let x = 1;
  if ($) {
    $(x);
    x = 2;
  } else {
    $(x);
  }
  $(x); // observes 1 or 2
}
`````


## Settled


`````js filename=intro
$(1);
if ($) {
  $(2);
} else {
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
if ($) {
  $(2);
} else {
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
if ($) {
  $( 2 );
}
else {
  $( 1 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
