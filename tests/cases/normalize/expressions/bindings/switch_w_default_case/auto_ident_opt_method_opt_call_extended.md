# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt method opt call extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e?.(1);
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
      b = { c: { d: { e: $ } } };
      a = b?.c.d.e?.(1);
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
let b;
let a;
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
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  b = { c: tmpObjLitVal };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest$5 = tmpChainRootProp != null;
  if (tmpIfTest$5) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$3 = tmpChainElementObject$1.e;
    const tmpIfTest$7 = tmpChainElementObject$3 != null;
    if (tmpIfTest$7) {
      const tmpChainElementCall = tmpChainElementObject$3.call(tmpChainElementObject$1, 1);
      a = tmpChainElementCall;
    }
  }
  $(a);
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$9) {
  $('fail1');
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$11) {
  $('fail2');
}
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const tmpSSA_b = { c: tmpObjLitVal };
let tmpSSA_a = undefined;
const tmpIfTest$5 = tmpSSA_b != null;
if (tmpIfTest$5) {
  const tmpChainElementObject = tmpSSA_b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$3 = tmpChainElementObject$1.e;
  const tmpIfTest$7 = tmpChainElementObject$3 != null;
  if (tmpIfTest$7) {
    const tmpChainElementCall = tmpChainElementObject$3.call(tmpChainElementObject$1, 1);
    tmpSSA_a = tmpChainElementCall;
  }
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
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
