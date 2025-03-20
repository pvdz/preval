# Preval test case

# base_outer_param_ref.md

> Function scope promo > Base outer param ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

## Input

`````js filename=intro
function h(x) {
  if ($) { $('prevent'); $('simple'); $('inlining'); }
  function f() {
    if ($) { $('prevent'); $('simple'); $('inlining'); }
    function g() {
      // ! The test is about whether this function gets moved up or not
      if ($) { $('prevent'); $('simple'); $('inlining'); }
      return x;
    }
    return g();
  }
  return f();
}
$(h($(10)));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(10);
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    if ($) {
      $(`prevent`);
      $(`simple`);
      $(`inlining`);
      $(tmpCalleeParam$1);
    } else {
      $(tmpCalleeParam$1);
    }
  } else {
    $(tmpCalleeParam$1);
  }
} else {
  $(tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$1 = $(10);
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
    if ($) {
      $(`prevent`);
      $(`simple`);
      $(`inlining`);
      $(tmpCalleeParam$1);
    } else {
      $(tmpCalleeParam$1);
    }
  } else {
    $(tmpCalleeParam$1);
  }
} else {
  $(tmpCalleeParam$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
if ($) {
  $( "prevent" );
  $( "simple" );
  $( "inlining" );
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
}
else {
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 'prevent'
 - 3: 'simple'
 - 4: 'inlining'
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
