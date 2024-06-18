# Preval test case

# object_spread.md

> Normalize > While > Test > Object spread
>
> Certain test values can be statically determined to be true or false

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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpObjLitVal$2 = $(1);
  const tmpObjLitVal$4 = $(2);
  const tmpCalleeParam$1 = { a: tmpObjLitVal$2, b: tmpObjLitVal$4 };
  const tmpObjSpread$1 = $(tmpCalleeParam$1);
  ({ ...tmpObjSpread$1 });
  $(`loop`);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = {
  a: a,
  b: b,
};
const d = $( c );
{ ... d };
$( "loop" );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = $( 1 );
  const f = $( 2 );
  const g = {
    a: e,
    b: f,
  };
  const h = $( g );
  { ... h };
  $( "loop" );
}
throw "[preval] unreachable; infinite loop";
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
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
