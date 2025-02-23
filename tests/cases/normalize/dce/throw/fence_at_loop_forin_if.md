# Preval test case

# fence_at_loop_forin_if.md

> Normalize > Dce > Throw > Fence at loop forin if
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
        throw $(7, 'throw');
        $('fail');
      } else {
        $('do not visit');
        throw $(8, 'throw');
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
              throw $(7, `throw`);
              $(`fail`);
            } else {
              $(`do not visit`);
              throw $(8, `throw`);
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
            const tmpThrowArg = $(7, `throw`);
            throw tmpThrowArg;
          } else {
            $(`do not visit`);
            const tmpThrowArg$1 = $(8, `throw`);
            throw tmpThrowArg$1;
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
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    $(`after (not invoked but should not be eliminated)`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
        const tmpForInGen$1 /*:unknown*/ = $forIn(tmpCalleeParam$1);
        const tmpForInNext$1 /*:unknown*/ = tmpForInGen$1.next();
        const tmpIfTest$4 /*:unknown*/ = tmpForInNext$1.done;
        if (tmpIfTest$4) {
          $(`after (not invoked but should not be eliminated)`);
        } else {
          const x$1 /*:unknown*/ = tmpForInNext$1.value;
          $(`loop`, x$1);
          const tmpIfTest$6 /*:unknown*/ = $(1, `if`);
          if (tmpIfTest$6) {
            $(`pass`);
            const tmpThrowArg$2 /*:unknown*/ = $(7, `throw`);
            throw tmpThrowArg$2;
          } else {
            $(`do not visit`);
            const tmpThrowArg$4 /*:unknown*/ = $(8, `throw`);
            throw tmpThrowArg$4;
          }
        }
      } else {
        break;
      }
    }
  } else {
    const x /*:unknown*/ = tmpForInNext.value;
    $(`loop`, x);
    const tmpIfTest$3 /*:unknown*/ = $(1, `if`);
    if (tmpIfTest$3) {
      $(`pass`);
      const tmpThrowArg /*:unknown*/ = $(7, `throw`);
      throw tmpThrowArg;
    } else {
      $(`do not visit`);
      const tmpThrowArg$1 /*:unknown*/ = $(8, `throw`);
      throw tmpThrowArg$1;
    }
  }
} else {
}
$(`after (not invoked)`);
$(undefined);
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
    $( "after (not invoked but should not be eliminated)" );
    while ($LOOP_UNROLL_10) {
      const f = $( true );
      if (f) {
        $( "loop" );
        const g = {
          a: 1,
          b: 2,
        };
        const h = $forIn( g );
        const i = h.next();
        const j = i.done;
        if (j) {
          $( "after (not invoked but should not be eliminated)" );
        }
        else {
          const k = i.value;
          $( "loop", k );
          const l = $( 1, "if" );
          if (l) {
            $( "pass" );
            const m = $( 7, "throw" );
            throw m;
          }
          else {
            $( "do not visit" );
            const n = $( 8, "throw" );
            throw n;
          }
        }
      }
      else {
        break;
      }
    }
  }
  else {
    const o = d.value;
    $( "loop", o );
    const p = $( 1, "if" );
    if (p) {
      $( "pass" );
      const q = $( 7, "throw" );
      throw q;
    }
    else {
      $( "do not visit" );
      const r = $( 8, "throw" );
      throw r;
    }
  }
}
$( "after (not invoked)" );
$( undefined );
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
 - 6: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
