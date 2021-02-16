# Preval test case

# poc.md

> normalize > switch > poc
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

## Normalized

`````js filename=intro
let x;
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
  }
  let tmpIfTest$2 = fallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothLhs$2 = x;
    const tmpBinBothRhs$2 = $(3);
    tmpIfTest$2 = tmpBinBothLhs$2 === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    $('C');
    break exit;
  }
}
`````

## Output

`````js filename=intro
let x;
let fallthrough = false;
exit: {
  let tmpIfTest = fallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothRhs = $(1);
    tmpIfTest = x === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    $('A');
    fallthrough = true;
  }
  let tmpIfTest$1 = fallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = x === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    $('B');
    break exit;
  }
  let tmpIfTest$2 = fallthrough;
  if (tmpIfTest$2) {
  } else {
    const tmpBinBothRhs$2 = $(3);
    tmpIfTest$2 = x === tmpBinBothRhs$2;
  }
  if (tmpIfTest$2) {
    $('C');
    break exit;
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

Normalized calls: Same

Final output calls: Same
