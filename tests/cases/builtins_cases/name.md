# Preval test case

# name.md

> Builtins cases > Name
>
>

## Input

`````js filename=intro
$(String.name);
$(Array.name);
$(parseInt.name);
`````


## Settled


`````js filename=intro
$(`String`);
$(`Array`);
$(`parseInt`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`String`);
$(`Array`);
$(`parseInt`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "String" );
$( "Array" );
$( "parseInt" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = `String`;
$(tmpCalleeParam);
let tmpCalleeParam$1 = `Array`;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = `parseInt`;
$(tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'String'
 - 2: 'Array'
 - 3: 'parseInt'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
