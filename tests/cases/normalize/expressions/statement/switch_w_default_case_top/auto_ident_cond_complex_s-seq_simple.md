# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Switch w default case top > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    $(1) ? (40, 50, 60) : $($(100));
    break;
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
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(1) ? (40, 50, 60) : $($(100));
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
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
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
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    const tmpIfTest$3 = $(1);
    if (tmpIfTest$3) {
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpCallCallee(tmpCalleeParam);
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
const a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
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
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    const tmpIfTest$3 = $(1);
    if (tmpIfTest$3) {
    } else {
      const tmpCalleeParam = $(100);
      $(tmpCalleeParam);
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
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
