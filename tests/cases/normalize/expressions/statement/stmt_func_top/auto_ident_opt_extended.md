# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { x: { y: { z: 100 } } };

  let a = { a: 999, b: 1000 };
  b?.x.y.z;
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 });
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: { y: { z: 100 } } };
  let a = { a: 999, b: 1000 };
  b?.x.y.z;
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = { z: 100 };
  const tmpObjLitVal = { y: tmpObjLitVal$1 };
  let b = { x: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$3 = tmpChainElementObject$1.z;
    $(a);
    return undefined;
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
