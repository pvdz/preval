# Preval test case

# multiple_args.md

> Global casting > String > Multiple args
>
> Calling global constructors to cast when the call is redundant should be eliminated

## Input

`````js filename=intro
const a = $('a');
const x = ''+a;
const y = String(x, 1, "twee");
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`a`);
const x /*:string*/ = $coerce(a, `plustr`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(`a`), `plustr`));
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
const tmpArgOverflow = x;
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
