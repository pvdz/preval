# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

#TODO

## Input

`````js filename=intro
switch (6) {
  default: 
  case $(30): ;
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = 6;
let tmpSwitchCaseToStart = 0;
const tmpBinLhs = $(30);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 0;
const tmpBinLhs = $(30);
const tmpIfTest = tmpBinLhs === 6;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 1;
}
{
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  const tmpIfTest$2 = tmpSwitchCaseToStart <= 1;
}
`````

## Result

Should call `$` with:
 - 1: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
