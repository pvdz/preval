# Preval test case

# auto_ident_opt_c-seq.md

> Normalize > Expressions > Statement > Switch w default case top > Auto ident opt c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    (1, 2, $(b))?.x;
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
let b = { x: 1 };
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
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    const tmpChainRootProp = $(b);
    const tmpIfTest$3 = tmpChainRootProp != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject = tmpChainRootProp.x;
    }
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$4) {
      $('fail1');
    }
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$5) {
      $('fail2');
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
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
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    const tmpChainRootProp = $(b);
    const tmpIfTest$3 = tmpChainRootProp != null;
    if (tmpIfTest$3) {
      tmpChainRootProp.x;
    }
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$4) {
      $('fail1');
    }
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$5) {
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
 - 2: 1
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
