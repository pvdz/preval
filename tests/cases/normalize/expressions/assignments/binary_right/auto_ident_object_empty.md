# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Binary right > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = {}));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const a /*:object*/ = {};
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const a = {};
$(tmpBinBothLhs + a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {};
const c = a + b;
$( c );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '100[object Object]'
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
