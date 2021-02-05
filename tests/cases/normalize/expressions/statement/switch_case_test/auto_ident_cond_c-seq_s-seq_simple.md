# Preval test case

# auto_ident_cond_c-seq_s-seq_simple.md

> normalize > expressions > statement > switch_case_test > auto_ident_cond_c-seq_s-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (10, 20, $(30)) ? (40, 50, 60) : $($(100)):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    let tmpBinBothRhs = undefined;
    10;
    20;
    const tmpIfTest$1 = $(30);
    if (tmpIfTest$1) {
      40;
      50;
      tmpBinBothRhs = 60;
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
    }
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
    }
    tmpFallthrough = true;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  const tmpBinBothLhs = tmpSwitchTest;
  let tmpBinBothRhs = undefined;
  const tmpIfTest$1 = $(30);
  if (tmpIfTest$1) {
    tmpBinBothRhs = 60;
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
  }
  tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
}
if (tmpIfTest) {
  tmpFallthrough = true;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 30
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
