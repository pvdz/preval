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


## Settled


`````js filename=intro
let tmpCalleeParam$1 /*:unknown*/ = undefined;
$inlinedFunction: {
  while (true) {
    const tmpIfTest /*:unknown*/ = $(true);
    if (tmpIfTest) {
      $(`loop`);
      const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
      const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
      const tmpForInNext /*:unknown*/ = tmpForInGen();
      const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
      if (tmpIfTest$1) {
        $(`after (not invoked but should not be eliminated)`);
      } else {
        const x /*:unknown*/ = tmpForInNext.value;
        $(`loop`, x);
        const tmpIfTest$3 /*:unknown*/ = $(1, `if`);
        if (tmpIfTest$3) {
          $(`pass`);
          tmpCalleeParam$1 = $(100, `return`);
          break $inlinedFunction;
        } else {
          $(`do not visit`);
          tmpCalleeParam$1 = $(101, `return`);
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


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$1 = undefined;
$inlinedFunction: {
  while (true) {
    if ($(true)) {
      $(`loop`);
      const tmpForInGen = $forIn({ a: 1, b: 2 });
      const tmpForInNext = tmpForInGen();
      if (tmpForInNext.done) {
        $(`after (not invoked but should not be eliminated)`);
      } else {
        $(`loop`, tmpForInNext.value);
        if ($(1, `if`)) {
          $(`pass`);
          tmpCalleeParam$1 = $(100, `return`);
          break $inlinedFunction;
        } else {
          $(`do not visit`);
          tmpCalleeParam$1 = $(101, `return`);
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


## PST Settled
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
      const e = d();
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
          a = $( 100, "return" );
          break $inlinedFunction;
        }
        else {
          $( "do not visit" );
          a = $( 101, "return" );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  while (true) {
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      $(`loop`);
      let tmpCalleeParam = { a: 1, b: 2 };
      const tmpForInGen = $forIn(tmpCalleeParam);
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        const tmpForInNext = tmpForInGen();
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
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
