# Preval test case

# if.md

> Normalize > While > If
>
> Loop with complex body

#TODO

## Input

`````js filename=intro
function f() {
  let i = 0;
  while (++i < 10) {
    if (i < 5) $(i, 'sub');
    else $(i, 'sup');
  }
  $(i);
}
if ($) f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (++i < 10) {
    if (i < 5) $(i, 'sub');
    else $(i, 'sup');
  }
  $(i);
};
if ($) f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (true) {
    i = i + 1;
    let tmpBinLhs = i;
    const tmpIfTest = tmpBinLhs < 10;
    if (tmpIfTest) {
      const tmpIfTest$1 = i < 5;
      if (tmpIfTest$1) {
        $(i, 'sub');
      } else {
        $(i, 'sup');
      }
    } else {
      break;
    }
  }
  $(i);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  let i = 0;
  while (true) {
    i = i + 1;
    const tmpIfTest = i < 10;
    if (tmpIfTest) {
      const tmpIfTest$1 = i < 5;
      if (tmpIfTest$1) {
        $(i, 'sub');
      } else {
        $(i, 'sup');
      }
    } else {
      break;
    }
  }
  $(i);
  return undefined;
};
if ($) {
  f();
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'sub'
 - 2: 2, 'sub'
 - 3: 3, 'sub'
 - 4: 4, 'sub'
 - 5: 5, 'sup'
 - 6: 6, 'sup'
 - 7: 7, 'sup'
 - 8: 8, 'sup'
 - 9: 9, 'sup'
 - 10: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
