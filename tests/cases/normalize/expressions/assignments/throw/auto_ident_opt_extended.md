# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt extended
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
throw (a = b?.x.y.z);
$(a);
`````

## Settled


`````js filename=intro
throw 100;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
throw 100;
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
throw (a = b?.x.y.z);
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
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## PST Settled
With rename=true

`````js filename=intro
throw 100;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ 100 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
