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
const tmpCalleeParam$1 /*:array*/ = [`a`, `b`];
const tmpCalleeParam /*:object*/ = new Set(tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = [`a`, `b`];
$(new Set(tmpCalleeParam$1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b" ];
const b = new Set( a );
$( b );
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
