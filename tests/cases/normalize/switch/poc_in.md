# Preval test case

# poc_in.md

> Normalize > Switch > Poc in
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

## Pre Normal

`````js filename=intro
let x = 1;
{
  const tmpSwitchValue = x;
  let tmpSwitchCaseToStart = 3;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(2) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else if ($(3) === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $('A');
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('B');
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('C');
      break tmpSwitchBreak;
    }
  }
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
    const tmpBinLhs$3 = $(3);
    const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $('A');
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    $('B');
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$9) {
      $('C');
      break tmpSwitchBreak;
    }
  }
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 3;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === 1;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
    const tmpBinLhs$3 = $(3);
    const tmpIfTest$3 = tmpBinLhs$3 === 1;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 2;
    }
  }
}
tmpSwitchBreak: {
  const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$5) {
    $('A');
  }
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    $('B');
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$9) {
      $('C');
      break tmpSwitchBreak;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'A'
 - 3: 'B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
