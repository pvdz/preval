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
    return g($(10));
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
    let g = function ($$0) {
      let x = $$0;
      debugger;
      const tmpBranchingA = function ($$0) {
        let x$1 = $$0;
        debugger;
        $('prevent');
        $('simple');
        $('inlining');
        const tmpReturnArg = tmpBranchingC(x$1);
        return tmpReturnArg;
      };
      const tmpBranchingB = function ($$0) {
        let x$3 = $$0;
        debugger;
        const tmpReturnArg$1 = tmpBranchingC(x$3);
        return tmpReturnArg$1;
      };
      const tmpBranchingC = function ($$0) {
        let x$5 = $$0;
        debugger;
        return x$5;
      };
      if ($) {
        const tmpReturnArg$3 = tmpBranchingA(x);
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$5 = tmpBranchingB(x);
        return tmpReturnArg$5;
      }
    };
    const tmpBranchingA$1 = function ($$0) {
      let g$1 = $$0;
      debugger;
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$7 = tmpBranchingC$1(g$1);
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function ($$0) {
      let g$3 = $$0;
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1(g$3);
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function ($$0) {
      let g$5 = $$0;
      debugger;
      const tmpCallCallee = g$5;
      const tmpCalleeParam = $(10);
      const tmpReturnArg$11 = tmpCallCallee(tmpCalleeParam);
      return tmpReturnArg$11;
    };
    if ($) {
      const tmpReturnArg$13 = tmpBranchingA$1(g);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(g);
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingA$3 = function ($$0) {
    let f$1 = $$0;
    debugger;
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$17 = tmpBranchingC$3(f$1);
    return tmpReturnArg$17;
  };
  const tmpBranchingB$3 = function ($$0) {
    let f$3 = $$0;
    debugger;
    const tmpReturnArg$19 = tmpBranchingC$3(f$3);
    return tmpReturnArg$19;
  };
  const tmpBranchingC$3 = function ($$0) {
    let f$5 = $$0;
    debugger;
    const tmpReturnArg$21 = f$5();
    return tmpReturnArg$21;
  };
  if ($) {
    const tmpReturnArg$23 = tmpBranchingA$3(f);
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = tmpBranchingB$3(f);
    return tmpReturnArg$25;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = h();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$7 = tmpBranchingC$1(g);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$15 = tmpBranchingC$1(g);
    return tmpReturnArg$15;
  }
};
const g = function ($$0) {
  const x = $$0;
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
const tmpBranchingC$1 = function ($$0) {
  const g$5 = $$0;
  debugger;
  const tmpCalleeParam = $(10);
  const tmpReturnArg$11 = g$5(tmpCalleeParam);
  return tmpReturnArg$11;
};
const h = function () {
  debugger;
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$17 = f();
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$25 = f();
    return tmpReturnArg$25;
  }
};
const tmpCalleeParam$1 = h();
$(tmpCalleeParam$1);
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
