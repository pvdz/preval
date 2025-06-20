# Preval test case

# multiple_args.md

> Global casting > Number > Multiple args
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = +a;
const y = Number(x, 1, "twee");
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const x /*:number*/ = +a;
$(x);
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
const tmpArgOverflow = x;
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
