# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident opt method call extended
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { c: { d: { e: $ } } };

    let a = b?.c.d.e(1);
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
  tmpObjLitVal$1 = { e: $ };
  tmpObjLitVal = { d: tmpObjLitVal$1 };
  b = { c: tmpObjLitVal };
  a = undefined;
  tmpChainRootProp = b;
  const tmpIfTest$3 = tmpChainRootProp != null;
  if (tmpIfTest$3) {
    const tmpChainElementObject = tmpChainRootProp.c;
    const tmpChainElementObject$1 = tmpChainElementObject.d;
    const tmpChainElementObject$2 = tmpChainElementObject$1.e;
    const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
    a = tmpChainElementCall;
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
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let SSA_a = undefined;
const tmpIfTest$3 = b != null;
if (tmpIfTest$3) {
  const tmpChainElementObject = b.c;
  const tmpChainElementObject$1 = tmpChainElementObject.d;
  const tmpChainElementObject$2 = tmpChainElementObject$1.e;
  const tmpChainElementCall = tmpChainElementObject$2.call(tmpChainElementObject$1, 1);
  SSA_a = tmpChainElementCall;
}
$(SSA_a);
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

Normalized calls: Same

Final output calls: Same
