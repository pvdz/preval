# Preval test case

# infi.md

> Let if while x > Infi
>
> An abstracted way of doing a boolean check
> The idea is that the `flag` var is eliminated and replaced by x.

## Input

`````js filename=intro
let n = 0;
let flag = true;
$('before');

const x = n < $(5);
if (x) {
} else {
  flag = false;
}
while (flag) {
  $('again');
}
$('after');
`````

## Pre Normal

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = n < $(5);
if (x) {
} else {
  flag = false;
}
while (flag) {
  $(`again`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const tmpBinBothLhs = n;
const tmpBinBothRhs = $(5);
const x = tmpBinBothLhs < tmpBinBothRhs;
if (x) {
} else {
  flag = false;
}
while (true) {
  if (flag) {
    $(`again`);
  } else {
    break;
  }
}
$(`after`);
`````

## Output

`````js filename=intro
$(`before`);
const tmpBinBothRhs = $(5);
const x = 0 < tmpBinBothRhs;
if (x) {
  $(`again`);
  while ($LOOP_UNROLL_10) {
    $(`again`);
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "before" );
const a = $( 5 );
const b = 0 < a;
if (b) {
  $( "again" );
  while ($LOOP_UNROLL_10) {
    $( "again" );
  }
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before'
 - 2: 5
 - 3: 'again'
 - 4: 'again'
 - 5: 'again'
 - 6: 'again'
 - 7: 'again'
 - 8: 'again'
 - 9: 'again'
 - 10: 'again'
 - 11: 'again'
 - 12: 'again'
 - 13: 'again'
 - 14: 'again'
 - 15: 'again'
 - 16: 'again'
 - 17: 'again'
 - 18: 'again'
 - 19: 'again'
 - 20: 'again'
 - 21: 'again'
 - 22: 'again'
 - 23: 'again'
 - 24: 'again'
 - 25: 'again'
 - 26: 'again'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
