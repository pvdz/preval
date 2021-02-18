# Preval test case

# auto_ident_opt_extended.md

> normalize > expressions > bindings > switch_case > auto_ident_opt_extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { x: { y: { z: 100 } } };

    let a = b?.x.y.z;
    $(a);
}
`````

## Normalized

`````js filename=intro
let tmpObjLitVal$1;
let tmpObjLitVal;
let b;
let a;
let tmpChainRootProp;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  tmpObjLitVal$1 = { z: 100 };
  tmpObjLitVal = { y: tmpObjLitVal$1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  tmpChainRootProp = b;
  const tmpIfTest$2 = tmpChainRootProp != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$2 = tmpChainElementObject$1.z;
    a = tmpChainElementObject$2;
  }
  $(a);
}
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
let SSA_a = undefined;
const tmpIfTest$2 = b != null;
if (tmpIfTest$2) {
  const tmpChainElementObject = b.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  SSA_a = tmpChainElementObject$2;
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
