# Preval test case

# base_try_finally.md

> Try > Base try finally
>
> Try base cases

## Input

`````js filename=intro
$(1);
try {
  $(2);
} finally {
  $(3);
}
$(3);
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
$(3);
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
$(3);
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
$( 3 );
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
