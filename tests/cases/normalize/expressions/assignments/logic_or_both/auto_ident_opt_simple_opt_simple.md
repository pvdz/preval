# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt simple opt simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
$((a = b?.x?.y) || (a = b?.x?.y));
$(a);
`````

## Settled


`````js filename=intro
$(1);
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(1);
`````

## Pre Normal


`````js filename=intro
let b = { x: { y: 1 } };
let a = { a: 999, b: 1000 };
$((a = b?.x?.y) || (a = b?.x?.y));
$(a);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    a = tmpChainElementObject$1;
  } else {
  }
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $(a);
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.x;
    const tmpIfTest$5 = tmpChainElementObject$3 != null;
    if (tmpIfTest$5) {
      const tmpChainElementObject$5 = tmpChainElementObject$3.y;
      tmpNestedComplexRhs = tmpChainElementObject$5;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
