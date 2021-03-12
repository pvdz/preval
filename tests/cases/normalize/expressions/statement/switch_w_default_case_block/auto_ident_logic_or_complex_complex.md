# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Switch w default case block > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      $($(0)) || $($(2));
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
    const tmpCallCallee = $;
    const tmpCalleeParam = $(0);
    const tmpIfTest$3 = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest$3) {
    } else {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpCallCallee$1(tmpCalleeParam$1);
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
    const tmpCalleeParam = $(0);
    const tmpIfTest$3 = $(tmpCalleeParam);
    if (tmpIfTest$3) {
    } else {
      const tmpCalleeParam$1 = $(2);
      $(tmpCalleeParam$1);
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
 - 3: 0
 - 4: 0
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
