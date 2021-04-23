# Preval test case

# poc_out.md

> Normalize > Switch > Poc out
>
> Just a thought

For something like

```js
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
```

#TODO

## Input

`````js filename=intro
let x;
let fallthrough = false;
exit: {
  if (fallthrough || x === $(1)) {
    {
      $('A');
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(2)) {
    {
      $('B');
      break exit;
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(3)) {
    {
      $('C');
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Pre Normal

`````js filename=intro
let x;
let fallthrough = false;
exit: {
  if (fallthrough || x === $(1)) {
    {
      $('A');
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(2)) {
    {
      $('B');
      break exit;
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(3)) {
    {
      $('C');
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let fallthrough = false;
exit: {
  let tmpIfTest = fallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = x;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    $('A');
    fallthrough = true;
  } else {
  }
  let tmpIfTest$1 = fallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = x;
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    $('B');
    break exit;
  } else {
    let tmpIfTest$3 = fallthrough;
    if (tmpIfTest$3) {
    } else {
      const tmpBinBothLhs$3 = x;
      const tmpBinBothRhs$3 = $(3);
      tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
    }
    if (tmpIfTest$3) {
      $('C');
      break exit;
    } else {
    }
  }
}
`````

## Output

`````js filename=intro
let fallthrough = false;
exit: {
  const tmpBinBothRhs = $(1);
  const tmpSSA_tmpIfTest = undefined === tmpBinBothRhs;
  if (tmpSSA_tmpIfTest) {
    $('A');
    fallthrough = true;
  } else {
  }
  let tmpIfTest$1 = fallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = undefined === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    $('B');
    break exit;
  } else {
    let tmpIfTest$3 = fallthrough;
    if (tmpIfTest$3) {
    } else {
      const tmpBinBothRhs$3 = $(3);
      tmpIfTest$3 = undefined === tmpBinBothRhs$3;
    }
    if (tmpIfTest$3) {
      $('C');
      break exit;
    } else {
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
