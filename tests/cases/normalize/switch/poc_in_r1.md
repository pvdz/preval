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

## Normalized

`````js filename=intro
let x = 1;
const tmpSwitchTest = x;
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  $('A');
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  $('A');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'A'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
