# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Arr element > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$((a = b?.x.y.z) + (a = b?.x.y.z));
$(a);
`````

## Settled


`````js filename=intro
$(200);
$(100);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(200);
$(100);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
$((a = b?.x.y.z) + (a = b?.x.y.z));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$3 = tmpChainElementObject$1.z;
  a = tmpChainElementObject$3;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootProp$1 = b;
const tmpIfTest$1 = tmpChainRootProp$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementObject$5 = tmpChainRootProp$1.x;
  const tmpChainElementObject$7 = tmpChainElementObject$5.y;
  const tmpChainElementObject$9 = tmpChainElementObject$7.z;
  a = tmpChainElementObject$9;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 200 );
$( 100 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 200
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
