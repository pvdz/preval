# Preval test case

# array_spread.md

> Normalize > While > Test > Array spread
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ([...$([1, 2, 3])]) {
  $('loop');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ([...$([1, 2, 3])]) {
  $(`loop`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2, 3];
  const tmpArrSpread = tmpCallCallee(tmpCalleeParam);
  const tmpIfTest = [...tmpArrSpread];
  if (tmpIfTest) {
    $(`loop`);
  } else {
    break;
  }
}
$(`after`);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [1, 2, 3];
const tmpArrSpread = $(tmpCalleeParam);
[...tmpArrSpread];
$(`loop`);
const tmpCalleeParam$1 = [1, 2, 3];
const tmpArrSpread$1 = $(tmpCalleeParam$1);
[...tmpArrSpread$1];
$(`loop`);
const tmpCalleeParam$2 = [1, 2, 3];
const tmpArrSpread$2 = $(tmpCalleeParam$2);
[...tmpArrSpread$2];
$(`loop`);
const tmpCalleeParam$3 = [1, 2, 3];
const tmpArrSpread$3 = $(tmpCalleeParam$3);
[...tmpArrSpread$3];
$(`loop`);
const tmpCalleeParam$4 = [1, 2, 3];
const tmpArrSpread$4 = $(tmpCalleeParam$4);
[...tmpArrSpread$4];
$(`loop`);
const tmpCalleeParam$5 = [1, 2, 3];
const tmpArrSpread$5 = $(tmpCalleeParam$5);
[...tmpArrSpread$5];
$(`loop`);
const tmpCalleeParam$6 = [1, 2, 3];
const tmpArrSpread$6 = $(tmpCalleeParam$6);
[...tmpArrSpread$6];
$(`loop`);
const tmpCalleeParam$7 = [1, 2, 3];
const tmpArrSpread$7 = $(tmpCalleeParam$7);
[...tmpArrSpread$7];
$(`loop`);
const tmpCalleeParam$8 = [1, 2, 3];
const tmpArrSpread$8 = $(tmpCalleeParam$8);
[...tmpArrSpread$8];
$(`loop`);
const tmpCalleeParam$9 = [1, 2, 3];
const tmpArrSpread$9 = $(tmpCalleeParam$9);
[...tmpArrSpread$9];
$(`loop`);
const tmpCalleeParam$10 = [1, 2, 3];
const tmpArrSpread$10 = $(tmpCalleeParam$10);
[...tmpArrSpread$10];
$(`loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$11 = [1, 2, 3];
  const tmpArrSpread$11 = $(tmpCalleeParam$11);
  [...tmpArrSpread$11];
  $(`loop`);
}
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'loop'
 - 3: [1, 2, 3]
 - 4: 'loop'
 - 5: [1, 2, 3]
 - 6: 'loop'
 - 7: [1, 2, 3]
 - 8: 'loop'
 - 9: [1, 2, 3]
 - 10: 'loop'
 - 11: [1, 2, 3]
 - 12: 'loop'
 - 13: [1, 2, 3]
 - 14: 'loop'
 - 15: [1, 2, 3]
 - 16: 'loop'
 - 17: [1, 2, 3]
 - 18: 'loop'
 - 19: [1, 2, 3]
 - 20: 'loop'
 - 21: [1, 2, 3]
 - 22: 'loop'
 - 23: [1, 2, 3]
 - 24: 'loop'
 - 25: [1, 2, 3]
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
