# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) + (a = void $(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(100);
$($Number_NaN);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$($Number_NaN);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( $Number_NaN );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
const tmpBinBothLhs = a;
$(100);
a = undefined;
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
 - 1: 100
 - 2: 100
 - 3: NaN
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
