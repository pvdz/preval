# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > statement > logic_and_left > auto_ident_opt_simple_opt_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
b?.x?.y && $(100);
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
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
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
  $(100);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
