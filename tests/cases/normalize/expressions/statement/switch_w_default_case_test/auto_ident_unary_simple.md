# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Switch w default case test > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case typeof x:
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if (typeof x === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = typeof x;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $('fail1');
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$7) {
      $('fail2');
    }
  }
}
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 'number' === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$5) {
      $('fail1');
    }
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$7) {
      $('fail2');
    }
  }
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
