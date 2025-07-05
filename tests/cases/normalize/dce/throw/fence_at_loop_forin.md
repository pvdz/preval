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
  const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
  const tmpForInGen /*:unknown*/ = $forIn(tmpCalleeParam);
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest$1 /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest$1) {
    $(`unreachable`);
    while ($LOOP_UNROLLS_LEFT_10) {
      const tmpIfTest$2 /*:unknown*/ = $(true);
      if (tmpIfTest$2) {
        $(`loop`);
        const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: 1, b: 2 };
        const tmpForInGen$1 /*:unknown*/ = $forIn(tmpCalleeParam$1);
        const tmpForInNext$1 /*:unknown*/ = tmpForInGen$1();
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
    $(`after (unreachable)`);
    $(undefined);
  } else {
    const x /*:unknown*/ = tmpForInNext.value;
    $(`loop`, x);
    const tmpThrowArg /*:unknown*/ = $(7, `throw`);
    throw tmpThrowArg;
  }
} else {
  $(`after (unreachable)`);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(`loop`);
  const tmpForInGen = $forIn({ a: 1, b: 2 });
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    $(`unreachable`);
    while (true) {
      if ($(true)) {
        $(`loop`);
        const tmpForInGen$1 = $forIn({ a: 1, b: 2 });
        const tmpForInNext$1 = tmpForInGen$1();
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
    $(`after (unreachable)`);
    $(undefined);
  } else {
    $(`loop`, tmpForInNext.value);
    const tmpThrowArg = $(7, `throw`);
    throw tmpThrowArg;
  }
} else {
  $(`after (unreachable)`);
  $(undefined);
}
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
  const d = c();
  const e = d.done;
  if (e) {
    $( "unreachable" );
    while ($LOOP_UNROLLS_LEFT_10) {
      const f = $( true );
      if (f) {
        $( "loop" );
        const g = {
          a: 1,
          b: 2,
        };
        const h = $forIn( g );
        const i = h();
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
    $( "after (unreachable)" );
    $( undefined );
  }
  else {
    const m = d.value;
    $( "loop", m );
    const n = $( 7, "throw" );
    throw n;
  }
}
else {
  $( "after (unreachable)" );
  $( undefined );
}
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
      while ($LOOP_NO_UNROLLS_LEFT) {
        const tmpForInNext = tmpForInGen();
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
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) fixme: spyless vars and labeled nodes
- (todo) support WhileStatement as statement in let_hoisting noob check


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
