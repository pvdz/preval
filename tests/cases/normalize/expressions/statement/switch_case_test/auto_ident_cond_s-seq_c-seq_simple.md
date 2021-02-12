# Preval test case

# auto_ident_cond_s-seq_c-seq_simple.md

> normalize > expressions > statement > switch_case_test > auto_ident_cond_s-seq_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (10, 20, 30) ? (40, 50, $(60)) : $($(100)):
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
let tmpBinLhs = undefined;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  tmpBinLhs = $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpBinLhs = tmpCallCallee(tmpCalleeParam);
}
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
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
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
