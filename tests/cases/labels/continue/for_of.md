# Preval test case

# for_of.md

> Labels > Continue > For of
>
> What about for-of/in loops?

## Input

`````js filename=intro
let x = {a:0, b: 1};
A: for (const y of x) {
  while (true) {
    $('a');
    if ($(true)) {
      continue A;
    }
    $('fail'); // unreachable
  }
  $('b'); // 2x
}
$('c');
`````

## Pre Normal


`````js filename=intro
let x = { a: 0, b: 1 };
A: {
  let tmpForOfGen = $forOf(x);
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    let tmpForOfNext = tmpForOfGen.next();
    if (tmpForOfNext.done) {
      break;
    } else {
      const y = tmpForOfNext.value;
      {
        $continue: {
          {
            while (true) {
              $(`a`);
              if ($(true)) {
                break $continue;
              }
              $(`fail`);
            }
            $(`b`);
          }
        }
      }
    }
  }
}
$(`c`);
`````

## Normalized


`````js filename=intro
let x = { a: 0, b: 1 };
let tmpForOfGen = $forOf(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  let tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const y = tmpForOfNext.value;
    while (true) {
      $(`a`);
      const tmpIfTest$1 = $(true);
      if (tmpIfTest$1) {
        break;
      } else {
        $(`fail`);
      }
    }
  }
}
$(`c`);
`````

## Output


`````js filename=intro
const x /*:object*/ = { a: 0, b: 1 };
const tmpForOfGen = $forOf(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForOfNext = tmpForOfGen.next();
  const tmpIfTest = tmpForOfNext.done;
  if (tmpIfTest) {
    break;
  } else {
    tmpForOfNext.value;
    $(`a`);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
    } else {
      while ($LOOP_UNROLL_10) {
        $(`fail`);
        $(`a`);
        const tmpIfTest$2 = $(true);
        if (tmpIfTest$2) {
          break;
        } else {
        }
      }
    }
  }
}
$(`c`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 0,
  b: 1,
};
const b = $forOf( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = b.next();
  const d = c.done;
  if (d) {
    break;
  }
  else {
    c.value;
    $( "a" );
    const e = $( true );
    if (e) {

    }
    else {
      while ($LOOP_UNROLL_10) {
        $( "fail" );
        $( "a" );
        const f = $( true );
        if (f) {
          break;
        }
      }
    }
  }
}
$( "c" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
