# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt extended
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
  default:
    $("fail1");
  case 2:
    $("fail2");
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
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  tmpObjLitVal$1 = { z: 100 };
  tmpObjLitVal = { y: tmpObjLitVal$1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  tmpChainRootProp = b;
  const tmpIfTest$3 = tmpChainRootProp != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    const tmpChainElementObject$2 = tmpChainElementObject$1.z;
    a = tmpChainElementObject$2;
  }
  $(a);
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
let SSA_a = undefined;
const tmpIfTest$3 = b != null;
if (tmpIfTest$3) {
  const tmpChainElementObject = b.x;
  const tmpChainElementObject$1 = tmpChainElementObject.y;
  const tmpChainElementObject$2 = tmpChainElementObject$1.z;
  SSA_a = tmpChainElementObject$2;
}
$(SSA_a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
