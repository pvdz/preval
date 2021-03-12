# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident opt simple opt simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: 1 } };

    let a = b?.x?.y;
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpObjLitVal = { y: 1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$2 = tmpChainRootProp != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      a = tmpChainElementObject$1;
    }
  }
  $(a);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
let SSA_a = undefined;
const tmpIfTest$2 = b != null;
if (tmpIfTest$2) {
  const tmpChainElementObject = b.x;
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    SSA_a = tmpChainElementObject$1;
  }
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
