# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Switch w default case test > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (a = $($(0)) || $($(1)) || $($(2))):
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
  if ((a = $($(0)) || $($(1)) || $($(2))) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
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
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$1);
  if (a) {
  } else {
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(2);
    a = tmpCallCallee$3(tmpCalleeParam$3);
  }
}
let tmpBinLhs = a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $('fail1');
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $('fail2');
}
$(a);
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCalleeParam = $(0);
let SSA_a = $(tmpCalleeParam);
if (SSA_a) {
} else {
  const tmpCalleeParam$1 = $(1);
  SSA_a = $(tmpCalleeParam$1);
  if (SSA_a) {
  } else {
    const tmpCalleeParam$3 = $(2);
    SSA_a = $(tmpCalleeParam$3);
  }
}
const tmpBinLhs = SSA_a;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
tmpSwitchCaseToStart <= 0;
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $('fail1');
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$7) {
  $('fail2');
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: 'fail1'
 - 7: 'fail2'
 - 8: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
