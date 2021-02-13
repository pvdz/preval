# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > assignments > switch_case_top > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
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
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpIfTest$2 = $(30);
    if (tmpIfTest$2) {
      a = $(60);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      a = tmpCallCallee(tmpCalleeParam);
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpIfTest$2 = $(30);
    if (tmpIfTest$2) {
      a = $(60);
    } else {
      const tmpCalleeParam = $(100);
      a = $(tmpCalleeParam);
    }
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 30
 - 4: 60
 - 5: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same