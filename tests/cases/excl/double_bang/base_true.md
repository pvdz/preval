# Preval test case

# base_true.md

> Excl > Double bang > Base true
>
> A double bang is really just a Boolean

## Input

`````js filename=intro
const a = $(1);
const b = !a;
const c = !b;
$(c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const c /*:boolean*/ = $boolean_constructor(a);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $boolean_constructor( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(1);
const b = !a;
const c = !b;
$(c);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
