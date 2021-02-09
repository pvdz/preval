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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = x;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $('A');
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = x;
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    {
      $('B');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = x;
    const tmpBinBothRhs$2 = $(3);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    {
      $('C');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
`````

## Output

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = x;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $('A');
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = x;
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    {
      $('B');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = x;
    const tmpBinBothRhs$2 = $(3);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    {
      $('C');
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
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

Final output calls: BAD!!
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined
