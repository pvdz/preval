# Preval test case

# default_middle3.md

> Normalize > Switch > Default middle3
>
> Normalize switches

```js
const test = 6;
let n = 0;
if (test === $(30)) n = 1;
else if (test === $(31)) n = 2;
else if (test === $(32)) n = 3;

foo: {
  if (a <= 1) $('a');
  if (a === 0) $('d');
  if (a <= 2) $('b');
  if (a <= 3) $('c');
}
```

#TODO

## Input

`````js filename=intro
switch ($(30)) {
  case $(30): $('a');
  default: $('b') 
  case $(31): $('c');
  case $(32): $('d');
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = $(30);
  let tmpSwitchCaseToStart = 1;
  if ($(30) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(31) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else if ($(32) === tmpSwitchValue) tmpSwitchCaseToStart = 3;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $('a');
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('b');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('c');
    }
    if (tmpSwitchCaseToStart <= 3) {
      $('d');
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = $(30);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(30);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(31);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
    const tmpBinLhs$3 = $(32);
    const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 3;
    }
  }
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  $('a');
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $('b');
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $('c');
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 3;
if (tmpIfTest$11) {
  $('d');
}
`````

## Output

`````js filename=intro
const tmpSwitchValue = $(30);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(30);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(31);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
    const tmpBinLhs$3 = $(32);
    const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 3;
    }
  }
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  $('a');
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $('b');
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $('c');
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 3;
if (tmpIfTest$11) {
  $('d');
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 30
 - 3: 'a'
 - 4: 'b'
 - 5: 'c'
 - 6: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
