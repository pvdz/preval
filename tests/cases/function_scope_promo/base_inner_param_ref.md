# Preval test case

# base_inner_param_ref.md

> Function scope promo > Base inner param ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

#TODO

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

## Pre Normal

`````js filename=intro
let h = function () {
  debugger;
  let f = function ($$0) {
    let x = $$0;
    debugger;
    let g = function () {
      debugger;
      if ($) {
        $('prevent');
        $('simple');
        $('inlining');
      }
      return x;
    };
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
    }
    return g();
  };
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
  }
  return f($(10));
};
$(h());
`````

## Normalized

`````js filename=intro
let h = function () {
  debugger;
  let f = function ($$0) {
    let x = $$0;
    debugger;
    let g = function () {
      debugger;
      if ($) {
        $('prevent');
        $('simple');
        $('inlining');
        return x;
      } else {
        return x;
      }
    };
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
    } else {
    }
    const tmpReturnArg = g();
    return tmpReturnArg;
  };
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
  } else {
  }
  const tmpCallCallee = f;
  const tmpCalleeParam = $(10);
  const tmpReturnArg$1 = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg$1;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = h();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
if ($) {
  $('prevent');
  $('simple');
  $('inlining');
} else {
}
const tmpCalleeParam = $(10);
if ($) {
  $('prevent');
  $('simple');
  $('inlining');
} else {
}
let tmpReturnArg = undefined;
if ($) {
  $('prevent');
  $('simple');
  $('inlining');
  tmpReturnArg = tmpCalleeParam;
} else {
  tmpReturnArg = tmpCalleeParam;
}
$(tmpReturnArg);
`````

## Globals

None

## Result

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

Final output calls: Same
