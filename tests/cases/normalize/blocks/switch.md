# Preval test case

# switch.md

> normalize > blocks > switch
>
> Add blocks to sub-statements. Let's do this for cases as well, for now. Maybe that's a mistake :)

#TODO

## Input

`````js filename=intro
switch ($(1)) {
  case $(2): $(3);
  case $(4):
  case $(5):
  case $(6): break;
  case $(7):
  default:
}
`````

## Normalized

`````js filename=intro
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(2);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $(3);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = tmpSwitchTest;
    const tmpBinBothRhs$1 = $(4);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = tmpSwitchTest;
    const tmpBinBothRhs$2 = $(5);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$3 = tmpFallthrough;
  if (tmpIfTest$3) {
  } else {
    const tmpBinBothLhs$3 = tmpSwitchTest;
    const tmpBinBothRhs$3 = $(6);
    tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    {
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$4 = tmpFallthrough;
  if (tmpIfTest$4) {
  } else {
    const tmpBinBothLhs$4 = tmpSwitchTest;
    const tmpBinBothRhs$4 = $(7);
    tmpIfTest$4 = tmpBinBothLhs$4 === tmpBinBothRhs$4;
  }
  if (tmpIfTest$4) {
    {
    }
    tmpFallthrough = true;
  }
  {
  }
}
`````

## Output

`````js filename=intro
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = tmpSwitchTest;
    const tmpBinBothRhs = $(2);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    {
      $(3);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = tmpSwitchTest;
    const tmpBinBothRhs$1 = $(4);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$2 = tmpFallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = tmpSwitchTest;
    const tmpBinBothRhs$2 = $(5);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    {
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$3 = tmpFallthrough;
  if (tmpIfTest$3) {
  } else {
    const tmpBinBothLhs$3 = tmpSwitchTest;
    const tmpBinBothRhs$3 = $(6);
    tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    {
      break tmpSwitchBreak;
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$4 = tmpFallthrough;
  if (tmpIfTest$4) {
  } else {
    const tmpBinBothLhs$4 = tmpSwitchTest;
    const tmpBinBothRhs$4 = $(7);
    tmpIfTest$4 = tmpBinBothLhs$4 === tmpBinBothRhs$4;
  }
  if (tmpIfTest$4) {
    {
    }
    tmpFallthrough = true;
  }
  {
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 7
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - 1: 1
 - eval returned: ('<crash[ <ref> is not defined ]>')
