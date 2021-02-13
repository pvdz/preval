# Preval test case

# auto_ident_logic_or_or.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_logic_or_or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      $($(0)) || $($(1)) || $($(2));
    }
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
tmpSwitchBreak: {
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$2) {
    {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(0);
      let tmpIfTest$3 = tmpCallCallee(tmpCalleeParam);
      if (tmpIfTest$3) {
      } else {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        tmpIfTest$3 = tmpCallCallee$1(tmpCalleeParam$1);
      }
      if (tmpIfTest$3) {
      } else {
        const tmpCallCallee$2 = $;
        const tmpCalleeParam$2 = $(2);
        tmpCallCallee$2(tmpCalleeParam$2);
      }
    }
    break tmpSwitchBreak;
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    $('fail1');
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$5) {
    $('fail2');
  }
}
$(a);
`````

## Output

`````js filename=intro
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
    {
      const tmpCalleeParam = $(0);
      let tmpIfTest$3 = $(tmpCalleeParam);
      if (tmpIfTest$3) {
      } else {
        const tmpCalleeParam$1 = $(1);
        tmpIfTest$3 = $(tmpCalleeParam$1);
      }
      if (tmpIfTest$3) {
      } else {
        const tmpCalleeParam$2 = $(2);
        $(tmpCalleeParam$2);
      }
    }
    break tmpSwitchBreak;
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    $('fail1');
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$5) {
    $('fail2');
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 0
 - 4: 0
 - 5: 1
 - 6: 1
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
