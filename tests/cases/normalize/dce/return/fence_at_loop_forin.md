# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Return > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x in {a: 1, b: 2}) {
      $('loop', x);
      return $(100, 'return');
      $('fail');
    }
  
    $('fail');
  }
  $('after (not invoked but should not be eliminated)');
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
            return $(100, `return`);
            $(`fail`);
          }
        }
      }
    }
    $(`fail`);
  }
  $(`after (not invoked but should not be eliminated)`);
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
          const tmpReturnArg = $(100, `return`);
          return tmpReturnArg;
        }
      }
      $(`fail`);
    } else {
      break;
    }
  }
  $(`after (not invoked but should not be eliminated)`);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
let tmpCalleeParam$1 /*:unknown*/ = undefined;
$inlinedFunction: {
  while (true) {
    const tmpIfTest /*:unknown*/ = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
      const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
      const tmpForInNext /*:unknown*/ = tmpForInGen.next();
      const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
      if (tmpIfTest$1) {
        $(`fail`);
      } else {
        const x /*:unknown*/ = tmpForInNext.value;
        $(`loop`, x);
        const tmpReturnArg /*:unknown*/ = $(100, `return`);
        tmpCalleeParam$1 = tmpReturnArg;
        break $inlinedFunction;
      }
    } else {
      break;
    }
  }
  $(`after (not invoked but should not be eliminated)`);
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
        $( "fail" );
      }
      else {
        const g = e.value;
        $( "loop", g );
        const h = $( 100, "return" );
        a = h;
        break $inlinedFunction;
      }
    }
    else {
      break;
    }
  }
  $( "after (not invoked but should not be eliminated)" );
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
 - 4: 100, 'return'
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
