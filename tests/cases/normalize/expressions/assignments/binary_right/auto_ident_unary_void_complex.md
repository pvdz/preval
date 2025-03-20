# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = void $(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
$(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + undefined;
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
$(100);
$(tmpBinBothLhs + undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( 100 );
const b = a + undefined;
$( b );
$( undefined );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: NaN
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
