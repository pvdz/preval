# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Break > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x in {a: 1, b: 2}) {
    $('loop', x);
    break;
    $('fail');
  }

  $('infiloop, do not eliminate');
}
$('after (not invoked)');
`````

## Pre Normal


`````js filename=intro
while ($(true)) {
  $(`loop`);
  {
    let tmpForInGen = $forIn({ a: 1, b: 2 });
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      let tmpForInNext = tmpForInGen.next();
      if (tmpForInNext.done) {
        break;
      } else {
        let x = tmpForInNext.value;
        {
          $(`loop`, x);
          break;
          $(`fail`);
        }
      }
    }
  }
  $(`infiloop, do not eliminate`);
}
$(`after (not invoked)`);
`````

## Normalized


`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
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
        $(`loop`, x);
        break;
      }
    }
    $(`infiloop, do not eliminate`);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(`loop`);
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  const tmpForInGen = $forIn(tmpCalleeParam);
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest$1 = tmpForInNext.done;
  if (tmpIfTest$1) {
  } else {
    const x = tmpForInNext.value;
    $(`loop`, x);
  }
  while ($LOOP_UNROLL_10) {
    $(`infiloop, do not eliminate`);
    const tmpIfTest$2 = $(true);
    if (tmpIfTest$2) {
      $(`loop`);
      const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
      const tmpForInGen$1 = $forIn(tmpCalleeParam$1);
      const tmpForInNext$1 = tmpForInGen$1.next();
      const tmpIfTest$4 = tmpForInNext$1.done;
      if (tmpIfTest$4) {
      } else {
        const x$1 = tmpForInNext$1.value;
        $(`loop`, x$1);
      }
    } else {
      break;
    }
  }
} else {
}
$(`after (not invoked)`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( "loop" );
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
    const f = d.value;
    $( "loop", f );
  }
  while ($LOOP_UNROLL_10) {
    $( "infiloop, do not eliminate" );
    const g = $( true );
    if (g) {
      $( "loop" );
      const h = {
        a: 1,
        b: 2,
      };
      const i = $forIn( h );
      const j = i.next();
      const k = j.done;
      if (k) {

      }
      else {
        const l = j.value;
        $( "loop", l );
      }
    }
    else {
      break;
    }
  }
}
$( "after (not invoked)" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 'infiloop, do not eliminate'
 - 5: true
 - 6: 'loop'
 - 7: 'loop', 'a'
 - 8: 'infiloop, do not eliminate'
 - 9: true
 - 10: 'loop'
 - 11: 'loop', 'a'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop', 'a'
 - 16: 'infiloop, do not eliminate'
 - 17: true
 - 18: 'loop'
 - 19: 'loop', 'a'
 - 20: 'infiloop, do not eliminate'
 - 21: true
 - 22: 'loop'
 - 23: 'loop', 'a'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
