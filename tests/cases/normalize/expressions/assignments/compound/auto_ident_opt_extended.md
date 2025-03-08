# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$((a *= b?.x.y.z));
$(a);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const tmpClusterSSA_a$1 /*:number*/ = a * 100;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a$1 = { a: 999, b: 1000 } * 100;
$(tmpClusterSSA_a$1);
$(tmpClusterSSA_a$1);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
$((a *= b?.x.y.z));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$3 = tmpChainElementObject$1.z;
  tmpBinBothRhs = tmpChainElementObject$3;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(a);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = a * 100;
$( b );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: NaN
 - 2: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
