# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Return > Fence at loop forin if
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x in {a: 1, b: 2}) {
      $('loop', x);
      if ($(1, 'if')) {
        $('pass');
        return $(100, 'return');
        $('fail');
      } else {
        $('do not visit');
        return $(101, 'return');
        $('fail');
      }
      $('fail -> DCE');
    }
  
    $('after (not invoked but should not be eliminated)');
  }
  $('after (not invoked)');
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
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
            if ($(1, `if`)) {
              $(`pass`);
              return $(100, `return`);
              $(`fail`);
            } else {
              $(`do not visit`);
              return $(101, `return`);
              $(`fail`);
            }
            $(`fail -> DCE`);
          }
        }
      }
    }
    $(`after (not invoked but should not be eliminated)`);
  }
  $(`after (not invoked)`);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
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
          const tmpIfTest$3 = $(1, `if`);
          if (tmpIfTest$3) {
            $(`pass`);
            const tmpReturnArg = $(100, `return`);
            return tmpReturnArg;
          } else {
            $(`do not visit`);
            const tmpReturnArg$1 = $(101, `return`);
            return tmpReturnArg$1;
          }
        }
      }
      $(`after (not invoked but should not be eliminated)`);
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
let tmpCalleeParam$1 = undefined;
$inlinedFunction: {
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpCalleeParam = { a: 1, b: 2 };
      const tmpForInGen = $forIn(tmpCalleeParam);
      const tmpForInNext = tmpForInGen.next();
      const tmpIfTest$1 = tmpForInNext.done;
      if (tmpIfTest$1) {
        $(`after (not invoked but should not be eliminated)`);
      } else {
        const x = tmpForInNext.value;
        $(`loop`, x);
        const tmpIfTest$3 = $(1, `if`);
        if (tmpIfTest$3) {
          $(`pass`);
          const tmpReturnArg = $(100, `return`);
          tmpCalleeParam$1 = tmpReturnArg;
          break $inlinedFunction;
        } else {
          $(`do not visit`);
          const tmpReturnArg$1 = $(101, `return`);
          tmpCalleeParam$1 = tmpReturnArg$1;
          break $inlinedFunction;
        }
      }
    } else {
      break;
    }
  }
  $(`after (not invoked)`);
}
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
$inlinedFunction: {
  while (true) {
    const b = $( true );
    if (b) {
      $( "loop" );
      const c = {
        a: 1,
        b: 2,
      };
      const d = $forIn( c );
      const e = d.next();
      const f = e.done;
      if (f) {
        $( "after (not invoked but should not be eliminated)" );
      }
      else {
        const g = e.value;
        $( "loop", g );
        const h = $( 1, "if" );
        if (h) {
          $( "pass" );
          const i = $( 100, "return" );
          a = i;
          break $inlinedFunction;
        }
        else {
          $( "do not visit" );
          const j = $( 101, "return" );
          a = j;
          break $inlinedFunction;
        }
      }
    }
    else {
      break;
    }
  }
  $( "after (not invoked)" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 1, 'if'
 - 5: 'pass'
 - 6: 100, 'return'
 - 7: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
