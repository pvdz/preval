# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = $(1) + $(2))]);
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
const a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1) + $(2);
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
const d = [ ...c ];
$( d );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
