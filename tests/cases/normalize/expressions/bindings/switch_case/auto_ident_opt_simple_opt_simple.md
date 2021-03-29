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

## Pre Normal

`````js filename=intro
{
  let b;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { x: { y: 1 } };
      a = b?.x?.y;
      $(a);
    }
  }
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  const tmpObjLitVal = { y: 1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$3 = tmpChainRootProp != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpIfTest$5 = tmpChainElementObject != null;
    if (tmpIfTest$5) {
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
const tmpSSA_b = { x: tmpObjLitVal };
let tmpSSA_a = undefined;
const tmpIfTest$3 = tmpSSA_b != null;
if (tmpIfTest$3) {
  const tmpChainElementObject = tmpSSA_b.x;
  const tmpIfTest$5 = tmpChainElementObject != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpSSA_a = tmpChainElementObject$1;
  }
}
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
