# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt simple opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
b?.x?.y && b?.x?.y;
$(a);
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
b?.x?.y && b?.x?.y;
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpIfTest = tmpChainElementObject$1;
  } else {
  }
} else {
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$5 = tmpChainRootProp$1 != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.x;
    const tmpIfTest$7 = tmpChainElementObject$3 != null;
    if (tmpIfTest$7) {
      const tmpChainElementObject$5 = tmpChainElementObject$3.y;
      $(a);
    } else {
      $(a);
    }
  } else {
    $(a);
  }
} else {
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
