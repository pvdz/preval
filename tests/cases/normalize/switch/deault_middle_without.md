# Preval test case

# test_complex.md

> normalize > switch > test_complex
>
> Normalize switches

The problem at hand is that default is allowed to jump back.

The input below should call $ with 10, 20, 30, 40, 50, and then 'd', 3, and 4. 

More complex cases are possible, where breaks happen at arbitrary points rather than top level. Send help.

I think it's "okay" to take the remaining cases and duplicate their consequent statements as the body of the default. Best case that's an empty list when the default is the last case, worst case it makes the rare situation where this occurs anyways, work in a less efficient way. At least it should still work... But some problems may arise, I dunno.

```js
let x = 6;
let fall = false;
exit: {
  if (x === $(10)) {
    $(1);
    break exit;
  }
  if (fall || x === $(20)) {
    $(1);
    fall = true
  }
  if (fall || x === $(30)) {
    $(3);
    fall = true;
  }
  if (fall || x === $(40)) {
    $(4);
    break exit;
  }
  if (fall || x === $(50)) {
    $(5);
  }
}
```



#TODO

## Input

`````js filename=intro
switch (6) {
  case $(10): $(1); break;
  case $(20): $(2);
  case $(30): $(3);
  case $(40): $(4); break;
  case $(50): $(5); break;
}
`````

## Normalized

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = 6;
    const tmpBinBothRhs = $(10);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $(1);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = 6;
    const tmpBinBothRhs$1 = $(20);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    {
      $(2);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = 6;
    const tmpBinBothRhs$2 = $(30);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    {
      $(3);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$3 = tmpFallthrough;
  if (tmpIfTest$3) {
  } else {
    const tmpBinBothLhs$3 = 6;
    const tmpBinBothRhs$3 = $(40);
    tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    {
      $(4);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$4 = tmpFallthrough;
  if (tmpIfTest$4) {
  } else {
    const tmpBinBothLhs$4 = 6;
    const tmpBinBothRhs$4 = $(50);
    tmpIfTest$4 = tmpBinBothLhs$4 === tmpBinBothRhs$4;
  }
  if (tmpIfTest$4) {
    {
      $(5);
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
    const tmpBinBothLhs = 6;
    const tmpBinBothRhs = $(10);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $(1);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = 6;
    const tmpBinBothRhs$1 = $(20);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    {
      $(2);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = 6;
    const tmpBinBothRhs$2 = $(30);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    {
      $(3);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$3 = tmpFallthrough;
  if (tmpIfTest$3) {
  } else {
    const tmpBinBothLhs$3 = 6;
    const tmpBinBothRhs$3 = $(40);
    tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    {
      $(4);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$4 = tmpFallthrough;
  if (tmpIfTest$4) {
  } else {
    const tmpBinBothLhs$4 = 6;
    const tmpBinBothRhs$4 = $(50);
    tmpIfTest$4 = tmpBinBothLhs$4 === tmpBinBothRhs$4;
  }
  if (tmpIfTest$4) {
    {
      $(5);
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 30
 - 4: 40
 - 5: 50
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
