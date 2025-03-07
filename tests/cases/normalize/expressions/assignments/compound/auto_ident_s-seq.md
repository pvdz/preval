# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > Compound > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a *= ($(1), $(2), x)));
$(a, x);
`````

## Settled


`````js filename=intro
$(1);
$(2);
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * 1;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpClusterSSA_a = { a: 999, b: 1000 } * 1;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a *= ($(1), $(2), x)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
$(1);
$(2);
const tmpBinBothRhs = x;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = {
  a: 999,
  b: 1000,
};
const b = a * 1;
$( b );
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: NaN
 - 4: NaN, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
