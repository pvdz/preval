# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Settled


`````js filename=intro
const tmpCallComplexCallee /*:unknown*/ = $($);
const a /*:unknown*/ = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 /*:unknown*/ = $($);
const tmpClusterSSA_a /*:unknown*/ = tmpCallComplexCallee$1(1);
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallComplexCallee = $($);
const a = tmpCallComplexCallee(1);
const tmpCallComplexCallee$1 = $($);
const tmpClusterSSA_a = tmpCallComplexCallee$1(1);
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($)(1)) + (a = $($)(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallComplexCallee = $($);
a = tmpCallComplexCallee(1);
let tmpBinBothLhs = a;
const tmpCallComplexCallee$1 = $($);
a = tmpCallComplexCallee$1(1);
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a( 1 );
const c = $( $ );
const d = c( 1 );
const e = b + d;
$( e );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: 2
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
