# Preval test case

# base_inner_param_ref.md

> Function scope promo > Base inner param ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

## Input

`````js filename=intro
function h() {
  if ($) { $('prevent'); $('simple'); $('inlining'); }
  function f(x) {
    if ($) { $('prevent'); $('simple'); $('inlining'); }
    function g() {
      // ! The test is about whether this function gets moved up or not
      if ($) { $('prevent'); $('simple'); $('inlining'); }
      return x;
    }
    return g();
  }
  return f($(10));
}
$(h());
`````


## Settled


`````js filename=intro
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
} else {
}
const tmpCalleeParam /*:unknown*/ = $(10);
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    $(tmpCalleeParam);
  } else {
    $(tmpCalleeParam);
  }
} else {
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
}
const tmpCalleeParam = $(10);
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    $(tmpCalleeParam);
  } else {
    $(tmpCalleeParam);
  }
} else {
  $(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( "prevent" );
  $( "simple" );
  $( "inlining" );
}
const a = $( 10 );
if ($) {
  $( "prevent" );
  $( "simple" );
  $( "inlining" );
  if ($) {
    $( "prevent" );
    $( "simple" );
    $( "inlining" );
    $( a );
  }
  else {
    $( a );
  }
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let h = function () {
  debugger;
  let f = function ($$0) {
    let x = $$0;
    debugger;
    let g = function () {
      debugger;
      if ($) {
        $(`prevent`);
        $(`simple`);
        $(`inlining`);
        return x;
      } else {
        return x;
      }
    };
    if ($) {
      $(`prevent`);
      $(`simple`);
      $(`inlining`);
    } else {
    }
    const tmpReturnArg = g();
    return tmpReturnArg;
  };
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
  } else {
  }
  const tmpCallCallee = f;
  let tmpCalleeParam = $(10);
  const tmpReturnArg$1 = f(tmpCalleeParam);
  return tmpReturnArg$1;
};
let tmpCalleeParam$1 = h();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check
- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'prevent'
 - 2: 'simple'
 - 3: 'inlining'
 - 4: 10
 - 5: 'prevent'
 - 6: 'simple'
 - 7: 'inlining'
 - 8: 'prevent'
 - 9: 'simple'
 - 10: 'inlining'
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
