# Preval test case

# auto_ident_cond_s-seq_s-seq_simple.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident cond s-seq s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = (10, 20, 30) ? (40, 50, 60) : $($(100))):
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ((a = (10, 20, 30) ? (40, 50, 60) : $($(100))) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$2 = 2 === tmpSwitchValue;
  if (tmpIfTest$2) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
$(a);
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 60 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$2 = 2 === tmpSwitchValue;
  if (tmpIfTest$2) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchCaseToStart <= 0;
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
$(60);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'fail1'
 - 3: 'fail2'
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
