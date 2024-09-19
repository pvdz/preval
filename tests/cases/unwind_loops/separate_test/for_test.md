# Preval test case

# for_test.md

> Unwind loops > Separate test > For test
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
for (test of $({a: 1})) {
  $('yolo');
  counter = counter + 1;
  test = counter < 10;
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = counter < 10;
{
  let tmpForOfGen = $forOf($({ a: 1 }));
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      test = tmpForOfNext.value;
      {
        $(`yolo`);
        counter = counter + 1;
        test = counter < 10;
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
let counter = 0;
let test = counter < 10;
const tmpCallCallee = $forOf;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = { a: 1 };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    test = tmpForOfNext.value;
    $(`yolo`);
    counter = counter + 1;
    test = counter < 10;
  }
}
`````

## Output


`````js filename=intro
let counter /*:number*/ = 0;
const tmpCalleeParam$1 /*:object*/ = { a: 1 };
const tmpCalleeParam = $(tmpCalleeParam$1);
const tmpForOfGen = $forOf(tmpCalleeParam);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
    $(`yolo`);
    counter = counter + 1;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
const b = { a: 1 };
const c = $( b );
const d = $forOf( c );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const e = d.next();
  const f = e.done;
  if (f) {
    break;
  }
  else {
    e.value;
    $( "yolo" );
    a = a + 1;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
