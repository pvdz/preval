# Preval test case

# ident_simple.md

> normalize > assignment > case-block > ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
switch ($('a')) { case $('a'): let a = b; break; }
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
const tmpSwitchTest = $('a');
{
  let a_1;
  const tmpSwitchValue = tmpSwitchTest;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a_1 = b;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
const tmpSwitchTest = $('a');
{
  let a_1;
  let tmpSwitchCaseToStart = 1;
  const tmpBinLhs = $('a');
  const tmpIfTest = tmpBinLhs === tmpSwitchTest;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  tmpSwitchBreak: {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a_1 = b;
      break tmpSwitchBreak;
    }
  }
}
$(a, b, c);
`````

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
