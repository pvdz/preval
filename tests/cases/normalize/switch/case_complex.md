# Preval test case

# case_complex.md

> Normalize > Switch > Case complex
>
> Normalize switches

Ideal output:

```js
if (1 === $(1)) {
  $(11);
  $(22);
} else if (1 === $(2)) {
  $(22);
}
```

#TODO

## Input

`````js filename=intro
switch (1) {
  case $(1): $(11);
  case $(2): $(22);
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(2) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(11);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(22);
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  $(11);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $(22);
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === 1;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  $(11);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $(22);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 11
 - 3: 22
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
