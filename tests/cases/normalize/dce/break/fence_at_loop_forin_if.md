# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Break > Fence at loop forin if
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
while ($(true)) {
  $('loop');
  
  for (let x in {a: 1, b: 2}) {
    $('loop', x);
    if ($(1)) {
      $('pass');
      break;
      $('fail');
    } else {
      $('do not visit');
      break;
      $('fail');
    }
    $('fail -> DCE');
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
          if ($(1)) {
            $(`pass`);
            break;
            $(`fail`);
          } else {
            $(`do not visit`);
            break;
            $(`fail`);
          }
          $(`fail -> DCE`);
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
        const tmpIfTest$3 = $(1);
        if (tmpIfTest$3) {
          $(`pass`);
          break;
        } else {
          $(`do not visit`);
          break;
        }
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
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpForInGen = $forIn(tmpCalleeParam);
  const tmpForInNext = tmpForInGen.next();
  const tmpIfTest$1 = tmpForInNext.done;
  if (tmpIfTest$1) {
  } else {
    const x = tmpForInNext.value;
    $(`loop`, x);
    const tmpIfTest$3 = $(1);
    if (tmpIfTest$3) {
      $(`pass`);
    } else {
      $(`do not visit`);
    }
  }
  while ($LOOP_UNROLL_10) {
    $(`infiloop, do not eliminate`);
    const tmpIfTest$2 = $(true);
    if (tmpIfTest$2) {
      $(`loop`);
      const tmpCalleeParam$1 = { a: 1, b: 2 };
      const tmpForInGen$1 = $forIn(tmpCalleeParam$1);
      const tmpForInNext$1 = tmpForInGen$1.next();
      const tmpIfTest$4 = tmpForInNext$1.done;
      if (tmpIfTest$4) {
      } else {
        const x$1 = tmpForInNext$1.value;
        $(`loop`, x$1);
        const tmpIfTest$6 = $(1);
        if (tmpIfTest$6) {
          $(`pass`);
        } else {
          $(`do not visit`);
        }
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
    const g = $( 1 );
    if (g) {
      $( "pass" );
    }
    else {
      $( "do not visit" );
    }
  }
  while ($LOOP_UNROLL_10) {
    $( "infiloop, do not eliminate" );
    const h = $( true );
    if (h) {
      $( "loop" );
      const i = {
        a: 1,
        b: 2,
      };
      const j = $forIn( i );
      const k = j.next();
      const l = k.done;
      if (l) {

      }
      else {
        const m = k.value;
        $( "loop", m );
        const n = $( 1 );
        if (n) {
          $( "pass" );
        }
        else {
          $( "do not visit" );
        }
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
 - 4: 1
 - 5: 'pass'
 - 6: 'infiloop, do not eliminate'
 - 7: true
 - 8: 'loop'
 - 9: 'loop', 'a'
 - 10: 1
 - 11: 'pass'
 - 12: 'infiloop, do not eliminate'
 - 13: true
 - 14: 'loop'
 - 15: 'loop', 'a'
 - 16: 1
 - 17: 'pass'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: 'loop', 'a'
 - 22: 1
 - 23: 'pass'
 - 24: 'infiloop, do not eliminate'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
