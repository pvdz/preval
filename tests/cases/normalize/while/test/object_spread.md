# Preval test case

# object_spread.md

> Normalize > While > Test > Object spread
>
> Certain test values can be statically determined to be true or false

#TODO

## Input

`````js filename=intro
while ({...$({a: $(1), b: $(2)})}) {
  $('loop');
}
$('after');
`````

## Pre Normal

`````js filename=intro
while ({ ...$({ a: $(1), b: $(2) }) }) {
  $(`loop`);
}
$(`after`);
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(1);
  const tmpObjLitVal$1 = $(2);
  const tmpCalleeParam = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
  const tmpObjSpread = tmpCallCallee(tmpCalleeParam);
  const tmpIfTest = { ...tmpObjSpread };
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
const tmpObjLitVal = $(1);
const tmpObjLitVal$1 = $(2);
const tmpCalleeParam = { a: tmpObjLitVal, b: tmpObjLitVal$1 };
const tmpObjSpread = $(tmpCalleeParam);
({ ...tmpObjSpread });
$(`loop`);
const tmpObjLitVal$2 = $(1);
const tmpObjLitVal$4 = $(2);
const tmpCalleeParam$1 = { a: tmpObjLitVal$2, b: tmpObjLitVal$4 };
const tmpObjSpread$1 = $(tmpCalleeParam$1);
({ ...tmpObjSpread$1 });
$(`loop`);
const tmpObjLitVal$3 = $(1);
const tmpObjLitVal$5 = $(2);
const tmpCalleeParam$2 = { a: tmpObjLitVal$3, b: tmpObjLitVal$5 };
const tmpObjSpread$2 = $(tmpCalleeParam$2);
({ ...tmpObjSpread$2 });
$(`loop`);
const tmpObjLitVal$6 = $(1);
const tmpObjLitVal$8 = $(2);
const tmpCalleeParam$3 = { a: tmpObjLitVal$6, b: tmpObjLitVal$8 };
const tmpObjSpread$3 = $(tmpCalleeParam$3);
({ ...tmpObjSpread$3 });
$(`loop`);
const tmpObjLitVal$7 = $(1);
const tmpObjLitVal$9 = $(2);
const tmpCalleeParam$4 = { a: tmpObjLitVal$7, b: tmpObjLitVal$9 };
const tmpObjSpread$4 = $(tmpCalleeParam$4);
({ ...tmpObjSpread$4 });
$(`loop`);
const tmpObjLitVal$10 = $(1);
const tmpObjLitVal$12 = $(2);
const tmpCalleeParam$5 = { a: tmpObjLitVal$10, b: tmpObjLitVal$12 };
const tmpObjSpread$5 = $(tmpCalleeParam$5);
({ ...tmpObjSpread$5 });
$(`loop`);
const tmpObjLitVal$11 = $(1);
const tmpObjLitVal$13 = $(2);
const tmpCalleeParam$6 = { a: tmpObjLitVal$11, b: tmpObjLitVal$13 };
const tmpObjSpread$6 = $(tmpCalleeParam$6);
({ ...tmpObjSpread$6 });
$(`loop`);
const tmpObjLitVal$14 = $(1);
const tmpObjLitVal$16 = $(2);
const tmpCalleeParam$7 = { a: tmpObjLitVal$14, b: tmpObjLitVal$16 };
const tmpObjSpread$7 = $(tmpCalleeParam$7);
({ ...tmpObjSpread$7 });
$(`loop`);
const tmpObjLitVal$15 = $(1);
const tmpObjLitVal$17 = $(2);
const tmpCalleeParam$8 = { a: tmpObjLitVal$15, b: tmpObjLitVal$17 };
const tmpObjSpread$8 = $(tmpCalleeParam$8);
({ ...tmpObjSpread$8 });
$(`loop`);
const tmpObjLitVal$18 = $(1);
const tmpObjLitVal$20 = $(2);
const tmpCalleeParam$9 = { a: tmpObjLitVal$18, b: tmpObjLitVal$20 };
const tmpObjSpread$9 = $(tmpCalleeParam$9);
({ ...tmpObjSpread$9 });
$(`loop`);
const tmpObjLitVal$19 = $(1);
const tmpObjLitVal$21 = $(2);
const tmpCalleeParam$10 = { a: tmpObjLitVal$19, b: tmpObjLitVal$21 };
const tmpObjSpread$10 = $(tmpCalleeParam$10);
({ ...tmpObjSpread$10 });
$(`loop`);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpObjLitVal$22 = $(1);
  const tmpObjLitVal$24 = $(2);
  const tmpCalleeParam$11 = { a: tmpObjLitVal$22, b: tmpObjLitVal$24 };
  const tmpObjSpread$11 = $(tmpCalleeParam$11);
  ({ ...tmpObjSpread$11 });
  $(`loop`);
}
$(`after`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '1', b: '2' }
 - 4: 'loop'
 - 5: 1
 - 6: 2
 - 7: { a: '1', b: '2' }
 - 8: 'loop'
 - 9: 1
 - 10: 2
 - 11: { a: '1', b: '2' }
 - 12: 'loop'
 - 13: 1
 - 14: 2
 - 15: { a: '1', b: '2' }
 - 16: 'loop'
 - 17: 1
 - 18: 2
 - 19: { a: '1', b: '2' }
 - 20: 'loop'
 - 21: 1
 - 22: 2
 - 23: { a: '1', b: '2' }
 - 24: 'loop'
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
