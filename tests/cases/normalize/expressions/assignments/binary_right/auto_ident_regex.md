# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = /foo/));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const a /*:regex*/ = /foo/;
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const a = /foo/;
$(tmpBinBothLhs + a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = /foo/;
const c = a + b;
$( c );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '100/foo/'
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
