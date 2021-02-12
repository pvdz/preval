# Preval test case

# poc_in.md

> normalize > switch > poc_in
>
> Fall through example

Ideally it ends up with something like this, except the case blocks are abstracted into arrows.

```js
exit: {
  let x = 1;

  let tmpBinaryRight = $(1);
  if (1 === tmpBinaryRight) {
    $('A');
    $('B');
    break exit;
  } 

  let tmpBinaryRight_1 = $(2);
  if (x === tmpBinaryRight_1) {
    $('B');
    break exit;
  }

  let tmpBinaryRight_2 = $(3);
  if (x === tmpBinaryRight_2) {
    $('C');
  }
}
```

#TODO

## Input

`````js filename=intro
let x = 1;
switch (x) {
 case $(1):
   $('A');
 case $(2):
   $('B');
   break;
 case $(3):
   $('C');
   break;
}
`````

## Normalized

`````js filename=intro
let x = 1;
const tmpSwitchValue = x;
let tmpSwitchCaseToStart = 3;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$2 = $(3);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchValue;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $('A');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    $('B');
    break tmpSwitchBreak;
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$5) {
    $('C');
    break tmpSwitchBreak;
  }
}
`````

## Output

`````js filename=intro
let x = 1;
const tmpSwitchValue = x;
let tmpSwitchCaseToStart = 3;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$2 = $(3);
    const tmpIfTest$2 = tmpBinLhs$2 === tmpSwitchValue;
    if (tmpIfTest$2) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    $('A');
  }
  const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$4) {
    $('B');
    break tmpSwitchBreak;
  }
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
  if (tmpIfTest$5) {
    $('C');
    break tmpSwitchBreak;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'A'
 - 3: 'B'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
