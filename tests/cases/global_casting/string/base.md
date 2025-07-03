# Preval test case

# base.md

> Global casting > String > Base
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = '' + a;
const y = String(x);
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const y /*:string*/ = $coerce(a, `plustr`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`a`) + ``);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $coerce( a, "plustr" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = $(`a`);
const x = $coerce(a, `plustr`);
const y = $coerce(x, `string`);
$(y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
