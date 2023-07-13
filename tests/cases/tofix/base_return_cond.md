# Preval test case

# base_return_cond.md

> Tofix > Base return cond
>
> A loop with a conditional early return

This used to properly unroll before the unroll changes
Let's fix that.

## Input

`````js filename=intro
function f() {
  let n = 0;
  while (true) {
    $('n:', ++n);
    if (n > 10) {
      return n;
    }
  }
  $('afterwards');
  return 100;
}
$('f():', f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    $(`n:`, ++n);
    if (n > 10) {
      return n;
    }
  }
  $(`afterwards`);
  return 100;
};
$(`f():`, f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let n = 0;
  while (true) {
    const tmpCallCallee = $;
    const tmpCalleeParam = `n:`;
    n = n + 1;
    let tmpCalleeParam$1 = n;
    tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
    const tmpIfTest = n > 10;
    if (tmpIfTest) {
      return n;
    } else {
    }
  }
  $(`afterwards`);
  return 100;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = `f():`;
const tmpCalleeParam$5 = f();
tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
`````

## Output

`````js filename=intro
$(`n:`, 1);
$(`n:`, 2);
$(`n:`, 3);
$(`n:`, 4);
$(`n:`, 5);
$(`n:`, 6);
$(`n:`, 7);
$(`n:`, 8);
$(`n:`, 9);
$(`n:`, 10);
$(`n:`, 11);
$(`f():`, 11);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'n:', 1
 - 2: 'n:', 2
 - 3: 'n:', 3
 - 4: 'n:', 4
 - 5: 'n:', 5
 - 6: 'n:', 6
 - 7: 'n:', 7
 - 8: 'n:', 8
 - 9: 'n:', 9
 - 10: 'n:', 10
 - 11: 'n:', 11
 - 12: 'f():', 11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
