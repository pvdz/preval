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
const tmpBool /*:boolean*/ = $boolean_constructor(tmpCalleeParam);
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($(true)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $boolean_constructor( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(true);
const bool = $boolean_constructor(tmpCalleeParam);
if (bool) {
  $(true);
} else {
  $(false);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
