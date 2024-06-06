# Preval test case

# base_own_param_ref.md

> Function scope promo > Base own param ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

#TODO

## Input

`````js filename=intro
function h() {
  if ($) { $('prevent'); $('simple'); $('inlining'); }
  function f() {
    if ($) { $('prevent'); $('simple'); $('inlining'); }
    function g(x) {
      // ! The test is about whether this function gets moved up or not
      if ($) { $('prevent'); $('simple'); $('inlining'); }
      return x;
    }
    return g($(10));
  }
  return f();
}
$(h());
`````

## Pre Normal


`````js filename=intro
let h = function () {
  debugger;
  let f = function () {
    debugger;
    let g = function ($$0) {
      let x = $$0;
      debugger;
      if ($) {
        $(`prevent`);
        $(`simple`);
        $(`inlining`);
      }
      return x;
    };
    if ($) {
      $(`prevent`);
      $(`simple`);
      $(`inlining`);
    }
    return g($(10));
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
    let g = function ($$0) {
      let x = $$0;
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
    const tmpCallCallee = g;
    const tmpCalleeParam = $(10);
    const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  };
  if ($) {
    $(`prevent`);
    $(`simple`);
    $(`inlining`);
  } else {
  }
  const tmpReturnArg$1 = f();
  return tmpReturnArg$1;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = h();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
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
const tmpCalleeParam = $(10);
if ($) {
  $(`prevent`);
  $(`simple`);
  $(`inlining`);
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

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
  }
}
const a = $( 10 );
if ($) {
  $( "prevent" );
  $( "simple" );
  $( "inlining" );
  $( a );
}
else {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'prevent'
 - 2: 'simple'
 - 3: 'inlining'
 - 4: 'prevent'
 - 5: 'simple'
 - 6: 'inlining'
 - 7: 10
 - 8: 'prevent'
 - 9: 'simple'
 - 10: 'inlining'
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
