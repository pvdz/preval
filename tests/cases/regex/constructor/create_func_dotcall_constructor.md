# Preval test case

# create_func_dotcall_constructor.md

> Regex > Constructor > Create func dotcall constructor
>
> Creating a function and calling it...

The system knows `regex.constructor` maps to `RegExp` and should be able to deal with this

## Input

`````js filename=intro
const f = /foo/.constructor('bar', 'g');
$(f);
`````


## Settled


`````js filename=intro
const f /*:regex*/ = /bar/g;
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(/bar/g);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = /bar/g;
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
