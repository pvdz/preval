# Preval test case

# get_regex_constructor.md

> Regex > Constructor > Get regex constructor
>
> Edge case implemented to solve jsf*ck

## Input

`````js filename=intro
const x = /foo/
const c = x.constructor;
const y = c('x', 'g');
$(y); // the regex `/x/g`
`````


## Settled


`````js filename=intro
const y /*:regex*/ = new $regex_constructor(`x`, `g`);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`x`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "x", "g" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = new $regex_constructor(`foo`, ``);
const c = x.constructor;
const y = c(`x`, `g`);
$(y);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
