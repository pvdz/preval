# Preval test case

# base_try_catch_short_finally.md

> Try > Base try catch short finally
>
> Try base cases

## Input

`````js filename=intro
$(1);
try {
  $(2);
} catch {
  $('fail');
} finally {
  $(3);
}
$(4);
`````


## Settled


`````js filename=intro
$(1);
try {
  $(2);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
$(4);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
try {
  $(2);
} catch ($finalImplicit) {
  $(3);
  throw $finalImplicit;
}
$(3);
$(4);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
try {
  $( 2 );
}
catch (a) {
  $( 3 );
  throw a;
}
$( 3 );
$( 4 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
