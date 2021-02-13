# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > statement > binary_both > auto_ident_opt_simple_opt_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
b?.x?.y + b?.x?.y;
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
  }
}
const tmpChainRootProp$1 = b;
const tmpIfTest$2 = tmpChainRootProp$1 != null;
if (tmpIfTest$2) {
  const tmpChainElementObject$2 = tmpChainRootProp$1.x;
  const tmpIfTest$3 = tmpChainElementObject$2 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$3 = tmpChainElementObject$2.y;
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
  }
}
const tmpChainRootProp$1 = b;
const tmpIfTest$2 = tmpChainRootProp$1 != null;
if (tmpIfTest$2) {
  const tmpChainElementObject$2 = tmpChainRootProp$1.x;
  const tmpIfTest$3 = tmpChainElementObject$2 != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$3 = tmpChainElementObject$2.y;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
