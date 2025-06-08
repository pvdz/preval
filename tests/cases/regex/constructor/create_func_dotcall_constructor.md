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
const f /*:regex*/ /*truthy*/ = new $regex_constructor(`bar`, `g`);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`bar`, `g`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "bar", "g" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCOO = new $regex_constructor(`foo`, ``);
const tmpMCF = tmpMCOO.constructor;
const f = $dotCall(tmpMCF, tmpMCOO, `constructor`, `bar`, `g`);
$(f);
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
