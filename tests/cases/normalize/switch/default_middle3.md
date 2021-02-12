# Preval test case

# test_complex.md

> normalize > switch > test_complex
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

## Normalized

`````js filename=intro
const tmpSwitchTest = $(30);
const tmpSwitchValue = tmpSwitchTest;
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
    const tmpBinLhs$2 = $(32);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchValue;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 3;
    }
  }
}
{
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $('a');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    $('b');
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$5) {
    $('c');
  }
  const tmpIfTest$6 = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$6) {
    $('d');
  }
}
`````

## Output

`````js filename=intro
const tmpSwitchTest = $(30);
const tmpSwitchValue = tmpSwitchTest;
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
    const tmpBinLhs$2 = $(32);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchValue;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 3;
    }
  }
}
{
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $('a');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    $('b');
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$5) {
    $('c');
  }
  const tmpIfTest$6 = tmpSwitchCaseToStart <= 3;
  if (tmpIfTest$6) {
    $('d');
  }
}
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 30
 - 3: 'a'
 - 4: 'b'
 - 5: 'c'
 - 6: 'd'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
