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
const y /*:regex*/ = /x/g;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/x/g);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /x/g;
$( a );
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
