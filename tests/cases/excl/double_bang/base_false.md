# Preval test case

# base_false.md

> Excl > Double bang > Base false
>
> A double bang is really just a Boolean

## Input

`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(0);
const c /*:boolean*/ = $boolean_constructor(a);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($(0)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $boolean_constructor( a );
$( b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
