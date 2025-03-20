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
const c /*:boolean*/ = Boolean(a);
$(c);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
$( b );
`````


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
