# Preval test case

# let_works.md

> If test bool > Let works
>
> A constant that is tested in an `if` must hold when inverted

Could apply the trick in this case because the mutation happens later. But it's more expensive.

## Input

`````js filename=intro
function f() {
  let x = $(1);
  if (x) {
    $('a', !x);
  } else {
    $('b', !x);
  }
  if ($) x = 10;
$(x);
}
f();
f();
f();
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const x /*:unknown*/ = $(1);
  if (x) {
    $(`a`, false);
  } else {
    $(`b`, true);
  }
  if ($) {
    $(10);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const x = $(1);
  if (x) {
    $(`a`, false);
  } else {
    $(`b`, true);
  }
  if ($) {
    $(10);
  } else {
    $(x);
  }
};
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 1 );
  if (b) {
    $( "a", false );
  }
  else {
    $( "b", true );
  }
  if ($) {
    $( 10 );
    return undefined;
  }
  else {
    $( b );
    return undefined;
  }
};
a();
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = $(1);
  if (x) {
    let tmpCalleeParam = !x;
    $(`a`, tmpCalleeParam);
  } else {
    let tmpCalleeParam$1 = !x;
    $(`b`, tmpCalleeParam$1);
  }
  if ($) {
    x = 10;
    $(x);
    return undefined;
  } else {
    $(x);
    return undefined;
  }
};
f();
f();
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'a', false
 - 3: 10
 - 4: 1
 - 5: 'a', false
 - 6: 10
 - 7: 1
 - 8: 'a', false
 - 9: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
