# Preval test case

# for_test_nested.md

> Unwind loops > Separate test > For test nested
>
> Unrolling loops

## Input

`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $('yolo');
  counter = counter + 1;
  for (test of $({a: 1})) {}
}
`````

## Pre Normal


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (test) {
  $(`yolo`);
  counter = counter + 1;
  {
    let tmpForOfGen = $forOf($({ a: 1 }));
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForOfNext = tmpForOfGen.next();
      if (tmpForOfNext.done) {
        break;
      } else {
        test = tmpForOfNext.value;
        {
        }
      }
    }
  }
}
`````

## Normalized


`````js filename=intro
let counter = 0;
let test = counter < 10;
while (true) {
  if (test) {
    $(`yolo`);
    counter = counter + 1;
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
      }
    }
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
let counter /*:number*/ = 0;
let test = true;
while (true) {
  $(`yolo`);
  counter = counter + 1;
  const tmpCalleeParam$1 /*:object*/ = { a: 1 };
  const tmpCalleeParam = $(tmpCalleeParam$1);
  const tmpForOfGen = $forOf(tmpCalleeParam);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpForOfNext = tmpForOfGen.next();
    const tmpIfTest = tmpForOfNext.done;
    if (tmpIfTest) {
      break;
    } else {
      test = tmpForOfNext.value;
    }
  }
  if (test) {
  } else {
    break;
  }
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
let b = true;
while (true) {
  $( "yolo" );
  a = a + 1;
  const c = { a: 1 };
  const d = $( c );
  const e = $forOf( d );
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const f = e.next();
    const g = f.done;
    if (g) {
      break;
    }
    else {
      b = f.value;
    }
  }
  if (b) {

  }
  else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'yolo'
 - 2: { a: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
