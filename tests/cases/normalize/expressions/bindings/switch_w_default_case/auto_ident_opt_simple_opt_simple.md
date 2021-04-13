# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt simple opt simple
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
  default:
    $("fail1");
  case 2:
    $("fail2");
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
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      b = { x: { y: 1 } };
      a = b?.x?.y;
      $(a);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
`````

## Normalized

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const tmpObjLitVal = { y: 1 };
  b = { x: tmpObjLitVal };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$5 = tmpChainRootProp != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject = tmpChainRootProp.x;
    const tmpIfTest$7 = tmpChainElementObject != null;
    if (tmpIfTest$7) {
      const tmpChainElementObject$1 = tmpChainElementObject.y;
      a = tmpChainElementObject$1;
    } else {
    }
  } else {
  }
  $(a);
} else {
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$9) {
  $('fail1');
} else {
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$11) {
  $('fail2');
} else {
}
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const tmpSSA_b = { x: tmpObjLitVal };
let tmpSSA_a = undefined;
const tmpIfTest$5 = tmpSSA_b != null;
if (tmpIfTest$5) {
  const tmpChainElementObject = tmpSSA_b.x;
  const tmpIfTest$7 = tmpChainElementObject != null;
  if (tmpIfTest$7) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpSSA_a = tmpChainElementObject$1;
  } else {
  }
} else {
}
$(tmpSSA_a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
