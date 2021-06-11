# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Logic and right > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
$(100) && b?.x.y.z;
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: { y: { z: 100 } } };
let a = { a: 999, b: 1000 };
$(100) && b?.x.y.z;
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpChainRootProp = b;
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$3 = tmpChainElementObject$1.z;
  } else {
  }
} else {
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const b = { x: tmpObjLitVal };
  const tmpIfTest$1 = b == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementObject = b.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpChainElementObject$1.z;
  }
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
