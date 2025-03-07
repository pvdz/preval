# Preval test case

# ident_logic_and_simple_simple2.md

> Spyless bug > Ident logic and simple simple2
>
> Normalization of assignments should work the same everywhere they are

This caught a regression in the movement of spyless var

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
a = a * tmpBinBothRhs;
$(a);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a /*:number*/ = a * 2;
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 } * 2);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
a = a * tmpBinBothRhs;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
a = a * tmpBinBothRhs;
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 2;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
