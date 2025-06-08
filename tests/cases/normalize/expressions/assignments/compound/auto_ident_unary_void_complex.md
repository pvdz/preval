# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= void $(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
a ** 0;
$($Number_NaN);
$($Number_NaN);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
({ a: 999, b: 1000 } ** 0);
$($Number_NaN);
$($Number_NaN);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = {
  a: 999,
  b: 1000,
};
a ** 0;
$( $Number_NaN );
$( $Number_NaN );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
$(100);
const tmpBinBothRhs = undefined;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
