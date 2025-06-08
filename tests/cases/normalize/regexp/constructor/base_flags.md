# Preval test case

# base_flags.md

> Normalize > Regexp > Constructor > Base flags
>
> Creating a regexp through constructor is same as doing as literal

## Input

`````js filename=intro
$(new RegExp("foo\\(x\\)", "mg"));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:regex*/ /*truthy*/ = new $regex_constructor(`foo\\(x\\)`, `mg`);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`foo\\(x\\)`, `mg`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo\\(x\\)", "mg" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = new $regex_constructor(`foo\\(x\\)`, `mg`);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
