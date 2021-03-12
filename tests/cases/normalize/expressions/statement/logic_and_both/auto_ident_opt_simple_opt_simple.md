# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident opt simple opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
b?.x?.y && b?.x?.y;
$(a);
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
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpIfTest = tmpChainElementObject$1;
  }
}
if (tmpIfTest) {
  const tmpChainRootProp$1 = b;
  const tmpIfTest$3 = tmpChainRootProp$1 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.x;
    const tmpIfTest$4 = tmpChainElementObject$2 != null;
    if (tmpIfTest$4) {
      const tmpChainElementObject$3 = tmpChainElementObject$2.y;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = b != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = b.x;
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpIfTest = tmpChainElementObject$1;
  }
}
if (tmpIfTest) {
  const tmpIfTest$3 = b != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$2 = b.x;
    const tmpIfTest$4 = tmpChainElementObject$2 != null;
    if (tmpIfTest$4) {
      tmpChainElementObject$2.y;
    }
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
