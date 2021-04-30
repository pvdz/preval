# Preval test case

# base_inner_var_ref.md

> Function scope promo > Base inner var ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

#TODO

## Input

`````js filename=intro
function h() {
  if ($) { $('prevent'); $('simple'); $('inlining'); }
  function f() {
    const x = $(10);
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
$(h());
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
        $('prevent');
        $('simple');
        $('inlining');
      }
      return x;
    };
    const x = $(10);
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
        $('prevent');
        $('simple');
        $('inlining');
        return x;
      } else {
        return x;
      }
    };
    const x = $(10);
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
  const tmpReturnArg$1 = f();
  return tmpReturnArg$1;
};
const tmpCallCallee = $;
const tmpCalleeParam = h();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const x = $(10);
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
      return x;
    } else {
      return x;
    }
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
const tmpReturnArg$1 = f();
$(tmpReturnArg$1);
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
