# Preval test case

# test_complex.md

> normalize > switch > test_complex
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

## Normalized

`````js filename=intro
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = 1;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $(11);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = 1;
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    ('case 1:');
    {
      $(22);
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
    const tmpBinBothLhs = 1;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      $(11);
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = 1;
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    ('case 1:');
    {
      $(22);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 11
 - 3: 22
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
