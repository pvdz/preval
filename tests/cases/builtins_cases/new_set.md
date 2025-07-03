# Preval test case

# new_set.md

> Builtins cases > New set
>
> If a labeled break does the same thing without the label then the label should be dropped

## Input

`````js filename=intro
$(new Set(['a', 'b']));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`a`, `b`];
const tmpCalleeParam /*:set*/ /*truthy*/ = new $set_constructor(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = [`a`, `b`];
$(new $set_constructor(tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b" ];
const b = new $set_constructor( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpNewCallee = Set;
let tmpCalleeParam$1 = [`a`, `b`];
let tmpCalleeParam = new tmpNewCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) array reads var statement with init NewExpression


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
