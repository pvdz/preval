# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= !$(100)));
$(a);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
const tmpBinBothRhs /*:boolean*/ = !tmpUnaryArg;
const tmpClusterSSA_a /*:number*/ = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const tmpClusterSSA_a = { a: 999, b: 1000 } * !tmpUnaryArg;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= !$(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpUnaryArg = $(100);
const tmpBinBothRhs = !tmpUnaryArg;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
const c = !a;
const d = b * c;
$( d );
$( d );
`````

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
