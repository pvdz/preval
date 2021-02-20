# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: { z: 100 } } };

let a = { a: 999, b: 1000 };
b?.x.y.z && b?.x.y.z;
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  tmpIfTest = tmpChainElementObject$2;
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$2 = tmpChainRootProp$1 != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$3 = tmpChainRootProp$1.x;
    const tmpChainElementObject$4 = tmpChainElementObject$3.y;
    const tmpChainElementObject$5 = tmpChainElementObject$4.z;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = b != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = b.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  tmpIfTest = tmpChainElementObject$2;
}
if (tmpIfTest) {
  const tmpIfTest$2 = b != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$3 = b.x;
    const tmpChainElementObject$4 = tmpChainElementObject$3.y;
    tmpChainElementObject$4.z;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
