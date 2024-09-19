# Preval test case

# forin.md

> Normalize > Dce > Break > Forin
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

## Input

`````js filename=intro
while ($(true)) {
  for (let x in {a: 1, b: 2}) {
    break;
    $('fail');
  }
}
$('after');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  {
    let tmpForInGen = $forIn({ a: 1, b: 2 });
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForInNext = tmpForInGen.next();
      if (tmpForInNext.done) {
        break;
      } else {
        let x = tmpForInNext.value;
        {
          break;
          $(`fail`);
        }
      }
    }
  }
}
$(`after`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpCallCallee = $forIn;
    const tmpCalleeParam = { a: 1, b: 2 };
    let tmpForInGen = tmpCallCallee(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForInNext = tmpForInGen.next();
      const tmpIfTest$1 = tmpForInNext.done;
      if (tmpIfTest$1) {
        break;
      } else {
        let x = tmpForInNext.value;
        break;
      }
    }
  } else {
    break;
  }
}
$(`after`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  const tmpForInGen = $forIn(tmpCalleeParam);
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest$1 = tmpForInNext.done;
  if (tmpIfTest$1) {
  } else {
    tmpForInNext.value;
  }
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$2 = $(true);
    if (tmpIfTest$2) {
      const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
      const tmpForInGen$1 = $forIn(tmpCalleeParam$1);
      const tmpForInNext$1 = tmpForInGen$1.next();
      const tmpIfTest$4 = tmpForInNext$1.done;
      if (tmpIfTest$4) {
      } else {
        tmpForInNext$1.value;
      }
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = {
    a: 1,
    b: 2,
  };
  const c = $forIn( b );
  const d = c.next();
  const e = d.done;
  if (e) {

  }
  else {
    d.value;
  }
  while ($LOOP_UNROLL_10) {
    const f = $( true );
    if (f) {
      const g = {
        a: 1,
        b: 2,
      };
      const h = $forIn( g );
      const i = h.next();
      const j = i.done;
      if (j) {

      }
      else {
        i.value;
      }
    }
    else {
      break;
    }
  }
}
$( "after" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - 4: true
 - 5: true
 - 6: true
 - 7: true
 - 8: true
 - 9: true
 - 10: true
 - 11: true
 - 12: true
 - 13: true
 - 14: true
 - 15: true
 - 16: true
 - 17: true
 - 18: true
 - 19: true
 - 20: true
 - 21: true
 - 22: true
 - 23: true
 - 24: true
 - 25: true
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
