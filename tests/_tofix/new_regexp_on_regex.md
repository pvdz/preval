# Preval test case

# new_regexp_on_regex.md

> Tofix > new regexp on regex
>
> This looks silly but I think it's just the same

## Input

`````js filename=intro
const x = /abc/g;
const newLineRegex = new RegExp(x); // -> same as regex literal 
$(newLineRegex);
`````


## Settled


`````js filename=intro
const x /*:regex*/ = new $regex_constructor(`abc`, `g`);
const newLineRegex /*:regex*/ = new $regex_constructor(x);
$(newLineRegex);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = new $regex_constructor(`abc`, `g`);
$(new $regex_constructor(x));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "abc", "g" );
const b = new $regex_constructor( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = new $regex_constructor(`abc`, `g`);
const newLineRegex = new $regex_constructor(x);
$(newLineRegex);
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
