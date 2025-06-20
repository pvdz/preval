# Preval test case

# base.md

> Global casting > Number > Base
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = +a;
const y = Number(x);
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const y /*:number*/ = +a;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(`a`);
$(+a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = +a;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`a`);
const x = +a;
const y = $coerce(x, `number`);
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
