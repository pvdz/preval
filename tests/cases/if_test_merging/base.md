# Preval test case

# base.md

> If test merging > Base
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
if (bool) {
  $(true);
} else {
  $(false);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const tmpBool /*:boolean*/ = Boolean(tmpCalleeParam);
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(true)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = Boolean( a );
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
