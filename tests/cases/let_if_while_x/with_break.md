# Preval test case

# with_break.md

> Let if while x > With break
>
> This variation does a break rather than updating the test. I think it should be normalized by a different trick because
> since count is no longer updated after the initial check, it may as well be an infinite loop. So the while loop should
> be moved inside the consequent branch and the while test should be come the init of count (to preserve our unroll counter)

## Input

`````js filename=intro
const s = $(10);
let count = $LOOP_UNROLL_10;
$('before');
let wat = s | 10;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $('inside');
  wat = wat | 10;
  const chk = $(true);
  if (chk) {
  } else {
    count = false;
  }
}
$(wat);
`````

## Pre Normal

`````js filename=intro
const s = $(10);
let count = $LOOP_UNROLL_10;
$(`before`);
let wat = s | 10;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $(`inside`);
  wat = wat | 10;
  const chk$1 = $(true);
  if (chk$1) {
  } else {
    count = false;
  }
}
$(wat);
`````

## Normalized

`````js filename=intro
const s = $(10);
let count = $LOOP_UNROLL_10;
$(`before`);
let wat = s | 10;
let chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $(`inside`);
  wat = wat | 10;
  const chk$1 = $(true);
  if (chk$1) {
  } else {
    count = false;
  }
}
$(wat);
`````

## Output

`````js filename=intro
const s = $(10);
let count = $LOOP_UNROLL_10;
$(`before`);
let wat = s | 10;
const chk = $(true);
if (chk) {
} else {
  count = false;
}
while (count) {
  $(`inside`);
  wat = wat | 10;
  const chk$1 = $(true);
  if (chk$1) {
  } else {
    count = false;
  }
}
$(wat);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 'before'
 - 3: true
 - 4: 'inside'
 - 5: true
 - 6: 'inside'
 - 7: true
 - 8: 'inside'
 - 9: true
 - 10: 'inside'
 - 11: true
 - 12: 'inside'
 - 13: true
 - 14: 'inside'
 - 15: true
 - 16: 'inside'
 - 17: true
 - 18: 'inside'
 - 19: true
 - 20: 'inside'
 - 21: true
 - 22: 'inside'
 - 23: true
 - 24: 'inside'
 - 25: true
 - 26: 'inside'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
