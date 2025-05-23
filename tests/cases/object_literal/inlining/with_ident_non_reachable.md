# Preval test case

# with_ident_non_reachable.md

> Object literal > Inlining > With ident non reachable
>
>

## Input

`````js filename=intro
let g = /regex/;
const obj = {f: g};
$(obj.f);
`````


## Settled


`````js filename=intro
const g /*:regex*/ = new $regex_constructor(`regex`, ``);
$(g);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(new $regex_constructor(`regex`, ``));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "regex", "" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = new $regex_constructor(`regex`, ``);
const obj = { f: g };
let tmpCalleeParam = obj.f;
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
