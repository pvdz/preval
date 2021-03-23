# Preval test case

# base_outer_var_ref.md

> Function scope promo > Base outer var ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

#TODO

## Input

`````js filename=intro
function h() {
  const x = $(10);
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
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
    }
    return g();
  };
  const x = $(10);
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
      const tmpBranchingA = function () {
        debugger;
        $('prevent');
        $('simple');
        $('inlining');
        const tmpReturnArg = tmpBranchingC();
        return tmpReturnArg;
      };
      const tmpBranchingB = function () {
        debugger;
        const tmpReturnArg$1 = tmpBranchingC();
        return tmpReturnArg$1;
      };
      const tmpBranchingC = function () {
        debugger;
        return x;
      };
      if ($) {
        const tmpReturnArg$2 = tmpBranchingA();
        return tmpReturnArg$2;
      } else {
        const tmpReturnArg$3 = tmpBranchingB();
        return tmpReturnArg$3;
      }
    };
    const tmpBranchingA$1 = function ($$0) {
      let g$1 = $$0;
      debugger;
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$4 = tmpBranchingC$1(g$1);
      return tmpReturnArg$4;
    };
    const tmpBranchingB$1 = function ($$0) {
      let g$2 = $$0;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC$1(g$2);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0) {
      let g$3 = $$0;
      debugger;
      const tmpReturnArg$6 = g$3();
      return tmpReturnArg$6;
    };
    if ($) {
      const tmpReturnArg$7 = tmpBranchingA$1(g);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(g);
      return tmpReturnArg$8;
    }
  };
  const x = $(10);
  const tmpBranchingA$2 = function ($$0, $$1) {
    let f$1 = $$0;
    let x$1 = $$1;
    debugger;
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$9 = tmpBranchingC$2(f$1, x$1);
    return tmpReturnArg$9;
  };
  const tmpBranchingB$2 = function ($$0, $$1) {
    let f$2 = $$0;
    let x$2 = $$1;
    debugger;
    const tmpReturnArg$10 = tmpBranchingC$2(f$2, x$2);
    return tmpReturnArg$10;
  };
  const tmpBranchingC$2 = function ($$0, $$1) {
    let f$3 = $$0;
    let x$3 = $$1;
    debugger;
    const tmpReturnArg$11 = f$3();
    return tmpReturnArg$11;
  };
  if ($) {
    const tmpReturnArg$12 = tmpBranchingA$2(f, x);
    return tmpReturnArg$12;
  } else {
    const tmpReturnArg$13 = tmpBranchingB$2(f, x);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = h();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const h = function () {
  debugger;
  const f = function () {
    debugger;
    const g = function () {
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
      const tmpReturnArg$4 = g();
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$8 = g();
      return tmpReturnArg$8;
    }
  };
  const x = $(10);
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$9 = f();
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$13 = f();
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam = h();
$(tmpCalleeParam);
`````

## Globals

None

## Result

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

Final output calls: Same
