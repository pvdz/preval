# Preval test case

# fence_at_loop_forof.md

> Normalize > Dce > Throw > Fence at loop forof
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x of [1, 2]) {
      $('loop', x);
      throw $(7, 'throw');
      $('fail');
    }
  
    $('do not visit, do not eliminate');
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
      let tmpForOfGen = $forOf([1, 2]);
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        let tmpForOfNext = tmpForOfGen.next();
        if (tmpForOfNext.done) {
          break;
        } else {
          let x = tmpForOfNext.value;
          {
            $(`loop`, x);
            throw $(7, `throw`);
            $(`fail`);
          }
        }
      }
    }
    $(`do not visit, do not eliminate`);
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
      const tmpCallCallee = $forOf;
      const tmpCalleeParam = [1, 2];
      let tmpForOfGen = tmpCallCallee(tmpCalleeParam);
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        let tmpForOfNext = tmpForOfGen.next();
        const tmpIfTest$1 = tmpForOfNext.done;
        if (tmpIfTest$1) {
          break;
        } else {
          let x = tmpForOfNext.value;
          $(`loop`, x);
          const tmpThrowArg = $(7, `throw`);
          throw tmpThrowArg;
        }
      }
      $(`do not visit, do not eliminate`);
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
  const tmpCalleeParam /*:array*/ = [1, 2];
  const tmpForOfGen /*:unknown*/ = $forOf(tmpCalleeParam);
  const tmpForOfNext /*:unknown*/ = tmpForOfGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForOfNext.done;
  if (tmpIfTest$1) {
    $(`do not visit, do not eliminate`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpCalleeParam$1 /*:array*/ = [1, 2];
        const tmpForOfGen$1 /*:unknown*/ = $forOf(tmpCalleeParam$1);
        const tmpForOfNext$1 /*:unknown*/ = tmpForOfGen$1.next();
        const tmpIfTest$4 /*:unknown*/ = tmpForOfNext$1.done;
        if (tmpIfTest$4) {
          $(`do not visit, do not eliminate`);
        } else {
          const x$1 /*:unknown*/ = tmpForOfNext$1.value;
          $(`loop`, x$1);
          const tmpThrowArg$1 /*:unknown*/ = $(7, `throw`);
          throw tmpThrowArg$1;
        }
      } else {
        break;
      }
    }
  } else {
    const x /*:unknown*/ = tmpForOfNext.value;
    $(`loop`, x);
    const tmpThrowArg /*:unknown*/ = $(7, `throw`);
    throw tmpThrowArg;
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
  const b = [ 1, 2 ];
  const c = $forOf( b );
  const d = c.next();
  const e = d.done;
  if (e) {
    $( "do not visit, do not eliminate" );
    while ($LOOP_UNROLL_10) {
      const f = $( true );
      if (f) {
        $( "loop" );
        const g = [ 1, 2 ];
        const h = $forOf( g );
        const i = h.next();
        const j = i.done;
        if (j) {
          $( "do not visit, do not eliminate" );
        }
        else {
          const k = i.value;
          $( "loop", k );
          const l = $( 7, "throw" );
          throw l;
        }
      }
      else {
        break;
      }
    }
  }
  else {
    const m = d.value;
    $( "loop", m );
    const n = $( 7, "throw" );
    throw n;
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
 - 3: 'loop', 1
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
