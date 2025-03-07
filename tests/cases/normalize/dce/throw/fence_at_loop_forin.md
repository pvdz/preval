# Preval test case

# fence_at_loop_forin.md

> Normalize > Dce > Throw > Fence at loop forin
>
> The DCE after a continue should be fenced at the nearest loop, not beyond.

## Input

`````js filename=intro
function f() {
  while ($(true)) {
    $('loop');
    
    for (let x in {a: 1, b: 2}) {
      $('loop', x);
      throw $(7, 'throw');
      $('fail');
    }
  
    $('unreachable');
  }
  $('after (unreachable)');
}
$(f());
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(`loop`);
  const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
  const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
  const tmpForInNext /*:unknown*/ = tmpForInGen.next();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    $(`unreachable`);
    while ($LOOP_UNROLL_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpCalleeParam$1 /*:object*/ = { a: 1, b: 2 };
        const tmpForInGen$1 /*:unknown*/ = $forIn(tmpCalleeParam$1);
        const tmpForInNext$1 /*:unknown*/ = tmpForInGen$1.next();
        const tmpIfTest$4 /*:unknown*/ = tmpForInNext$1.done;
        if (tmpIfTest$4) {
          $(`unreachable`);
        } else {
          const x$1 /*:unknown*/ = tmpForInNext$1.value;
          $(`loop`, x$1);
          const tmpThrowArg$1 /*:unknown*/ = $(7, `throw`);
          throw tmpThrowArg$1;
        }
      } else {
        break;
      }
    }
  } else {
    const x /*:unknown*/ = tmpForInNext.value;
    $(`loop`, x);
    const tmpThrowArg /*:unknown*/ = $(7, `throw`);
    throw tmpThrowArg;
  }
} else {
}
$(`after (unreachable)`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`loop`);
  const tmpForInNext = $forIn({ a: 1, b: 2 }).next();
  if (tmpForInNext.done) {
    $(`unreachable`);
    while (true) {
      if ($(true)) {
        $(`loop`);
        const tmpForInNext$1 = $forIn({ a: 1, b: 2 }).next();
        if (tmpForInNext$1.done) {
          $(`unreachable`);
        } else {
          $(`loop`, tmpForInNext$1.value);
          const tmpThrowArg$1 = $(7, `throw`);
          throw tmpThrowArg$1;
        }
      } else {
        break;
      }
    }
  } else {
    $(`loop`, tmpForInNext.value);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  }
}
$(`after (unreachable)`);
$(undefined);
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
            throw $(7, `throw`);
            $(`fail`);
          }
        }
      }
    }
    $(`unreachable`);
  }
  $(`after (unreachable)`);
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
      const tmpCalleeParam = { a: 1, b: 2 };
      let tmpForInGen = $forIn(tmpCalleeParam);
      while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
        let tmpForInNext = tmpForInGen.next();
        const tmpIfTest$1 = tmpForInNext.done;
        if (tmpIfTest$1) {
          break;
        } else {
          let x = tmpForInNext.value;
          $(`loop`, x);
          const tmpThrowArg = $(7, `throw`);
          throw tmpThrowArg;
        }
      }
      $(`unreachable`);
    } else {
      break;
    }
  }
  $(`after (unreachable)`);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
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
    $( "unreachable" );
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
          $( "unreachable" );
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
$( "after (unreachable)" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: 'loop', 'a'
 - 4: 7, 'throw'
 - eval returned: ('<crash[ 7 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
