# Preval test case

# switch_func_hoisting.md

> Normalize > Hoisting > Func > Switch func hoisting
>
> Func decl inside a switch block

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(1):
    f();
    break;
  case $(2):
    function f() { $('pass'); }
}
`````

## Normalized

`````js filename=intro
let f = function () {
  $('pass');
};
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    f();
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
  }
}
`````

## Output

`````js filename=intro
const f = function () {
  $('pass');
};
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchTest;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    f();
    break tmpSwitchBreak;
  } else {
    tmpSwitchCaseToStart <= 1;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
