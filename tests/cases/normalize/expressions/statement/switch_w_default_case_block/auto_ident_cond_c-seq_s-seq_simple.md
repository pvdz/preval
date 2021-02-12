# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > statement > switch_w_default_case_block > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      (10, 20, $(30)) ? (40, 50, 60) : $($(100));
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
      const tmpIfTest$3 = $(30);
      if (tmpIfTest$3) {
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        tmpCallCallee(tmpCalleeParam);
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
 - 3: 30
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
