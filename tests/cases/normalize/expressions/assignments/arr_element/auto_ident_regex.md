# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) + (a = /foo/));
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:regex*/ /*truthy*/ = new $regex_constructor(`foo`, ``);
$(`/foo//foo/`);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = new $regex_constructor(`foo`, ``);
$(`/foo//foo/`);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "foo", "" );
$( "/foo//foo/" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $regex_constructor(`foo`, ``);
const tmpBinBothLhs = a;
a = new $regex_constructor(`foo`, ``);
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '/foo//foo/'
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
