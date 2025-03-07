# Preval test case

# base_no_ref.md

> Function scope promo > Base no ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

## Input

`````js filename=intro
function h() {
  if ($) { $('prevent'); $('simple'); $('inlining'); }
  function f() {
    if ($) { $('prevent'); $('simple'); $('inlining'); }
    function g() {
      // ! The test is about whether this function gets moved up or not
      if ($) { $('prevent'); $('simple'); $('inlining'); }
      return $(10);
    }
    return g();
  }
  return f();
}
$(h());
`````

## Settled


`````js filename=intro
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
    } else {
    }
  } else {
  }
} else {
}
const tmpReturnArg /*:unknown*/ = $(10);
$(tmpReturnArg);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
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
    }
  }
}
$($(10));
`````

## Pre Normal


`````js filename=intro
let h = function () {
  debugger;
  let f = function () {
    debugger;
    let g = function () {
      debugger;
      if ($) {
        $(`prevent`);
        $(`simple`);
        $(`inlining`);
      }
      return $(10);
    };
    if ($) {
      $(`prevent`);
      $(`simple`);
      $(`inlining`);
    }
    return g();
  };
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
  }
  return f();
};
$(h());
`````

## Normalized


`````js filename=intro
let h = function () {
  debugger;
  let f = function () {
    debugger;
    let g = function () {
      debugger;
      if ($) {
        $(`prevent`);
        $(`simple`);
        $(`inlining`);
      } else {
      }
      const tmpReturnArg = $(10);
      return tmpReturnArg;
    };
    if ($) {
      $(`prevent`);
      $(`simple`);
      $(`inlining`);
    } else {
    }
    const tmpReturnArg$1 = g();
    return tmpReturnArg$1;
  };
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
  } else {
  }
  const tmpReturnArg$3 = f();
  return tmpReturnArg$3;
};
const tmpCalleeParam = h();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
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
    }
  }
}
const a = $( 10 );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'prevent'
 - 2: 'simple'
 - 3: 'inlining'
 - 4: 'prevent'
 - 5: 'simple'
 - 6: 'inlining'
 - 7: 'prevent'
 - 8: 'simple'
 - 9: 'inlining'
 - 10: 10
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
