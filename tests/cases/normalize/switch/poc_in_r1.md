# Preval test case

# poc_in_r1.md

> Normalize > Switch > Poc in r1
>
> Fall through example

Regression case

#TODO at the time of writing the tmpBinaryRight var decl disappears

## Input

`````js filename=intro
let x = 1;
switch (x) {
 case $(1):
   $('A');
}
`````

## Pre Normal

`````js filename=intro
let x = 1;
{
  const tmpSwitchValue = x;
  let tmpSwitchCaseToStart = 1;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $('A');
    }
  }
}
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpSwitchValue = x;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  $('A');
} else {
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  $('A');
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
