# Preval test case

# auto_ident_opt_simple_opt_simple.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident opt simple opt simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: { y: 1 } };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case b?.x?.y:
    break;
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
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpChainRootProp = b;
const tmpIfTest$1 = tmpChainRootProp != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = tmpChainRootProp.x;
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpBinLhs = tmpChainElementObject$1;
  }
}
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$3 = 2 === tmpSwitchTest;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$4) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $('fail1');
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$6) {
      $('fail2');
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = { y: 1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpIfTest$1 = b != null;
if (tmpIfTest$1) {
  const tmpChainElementObject = b.x;
  const tmpIfTest$2 = tmpChainElementObject != null;
  if (tmpIfTest$2) {
    const tmpChainElementObject$1 = tmpChainElementObject.y;
    tmpBinLhs = tmpChainElementObject$1;
  }
}
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$3 = 2 === tmpSwitchTest;
  if (tmpIfTest$3) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$4) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $('fail1');
    }
    const tmpIfTest$6 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$6) {
      $('fail2');
    }
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
