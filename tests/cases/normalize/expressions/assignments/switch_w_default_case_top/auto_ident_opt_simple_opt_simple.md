# Preval test case

# auto_ident_opt_simple_opt_simple.md

> normalize > expressions > assignments > switch_w_default_case_top > auto_ident_opt_simple_opt_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = b?.x?.y;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
{
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    a = undefined;
    const tmpChainRootProp = b;
    const tmpIfTest$3 = tmpChainRootProp != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject = tmpChainRootProp.x;
      const tmpIfTest$4 = tmpChainElementObject != null;
      if (tmpIfTest$4) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        a = tmpChainElementObject$1;
      }
    }
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $('fail1');
  }
  const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$6) {
    $('fail2');
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
let b = { x: tmpObjLitVal };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
{
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    a = undefined;
    const tmpIfTest$3 = b != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject = b.x;
      const tmpIfTest$4 = tmpChainElementObject != null;
      if (tmpIfTest$4) {
        const tmpChainElementObject$1 = tmpChainElementObject.y;
        a = tmpChainElementObject$1;
      }
    }
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$5) {
    $('fail1');
  }
  const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$6) {
    $('fail2');
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail1'
 - 4: 'fail2'
 - 5: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
