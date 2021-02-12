# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_logic_and_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      $($(1)) && $($(2));
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
      const tmpCalleeParam = $(1);
      const tmpIfTest$3 = tmpCallCallee(tmpCalleeParam);
      if (tmpIfTest$3) {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(2);
        tmpCallCallee$1(tmpCalleeParam$1);
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
