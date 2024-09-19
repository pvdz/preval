# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Continue > Fence at loop forin if
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
      continue;
      $('fail');
    } else {
      $('do not visit');
      continue;
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
          $continue: {
            {
              $(`loop`, x);
              if ($(1)) {
                $(`pass`);
                break $continue;
                $(`fail`);
              } else {
                $(`do not visit`);
                break $continue;
                $(`fail`);
              }
              $(`fail -> DCE`);
            }
          }
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
        $continue: {
          $(`loop`, x);
          const tmpIfTest$3 = $(1);
          if (tmpIfTest$3) {
            $(`pass`);
            break $continue;
          } else {
            $(`do not visit`);
            break $continue;
          }
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
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`loop`);
    const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
    const tmpForInGen = $forIn(tmpCalleeParam);
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const tmpForInNext = tmpForInGen.next();
      const tmpIfTest$1 = tmpForInNext.done;
      if (tmpIfTest$1) {
        break;
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
    }
    $(`infiloop, do not eliminate`);
  } else {
    break;
  }
}
$(`after (not invoked)`);
`````

## PST Output

With rename=true

`````js filename=intro
while (true) {
  const a = $( true );
  if (a) {
    $( "loop" );
    const b = {
      a: 1,
      b: 2,
    };
    const c = $forIn( b );
    while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
      const d = c.next();
      const e = d.done;
      if (e) {
        break;
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
    }
    $( "infiloop, do not eliminate" );
  }
  else {
    break;
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
 - 6: 'loop', 'b'
 - 7: 1
 - 8: 'pass'
 - 9: 'infiloop, do not eliminate'
 - 10: true
 - 11: 'loop'
 - 12: 'loop', 'a'
 - 13: 1
 - 14: 'pass'
 - 15: 'loop', 'b'
 - 16: 1
 - 17: 'pass'
 - 18: 'infiloop, do not eliminate'
 - 19: true
 - 20: 'loop'
 - 21: 'loop', 'a'
 - 22: 1
 - 23: 'pass'
 - 24: 'loop', 'b'
 - 25: 1
 - 26: 'pass'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
