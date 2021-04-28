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
        const tmpReturnArg$3 = tmpBranchingA();
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$5 = tmpBranchingB();
        return tmpReturnArg$5;
      }
    };
    const tmpBranchingA$1 = function () {
      debugger;
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$9 = tmpBranchingC$1();
      return tmpReturnArg$9;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$11 = g();
      return tmpReturnArg$11;
    };
    if ($) {
      const tmpReturnArg$13 = tmpBranchingA$1();
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1();
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingA$3 = function () {
    debugger;
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$17 = tmpBranchingC$3();
    return tmpReturnArg$17;
  };
  const tmpBranchingB$3 = function () {
    debugger;
    const tmpReturnArg$19 = tmpBranchingC$3();
    return tmpReturnArg$19;
  };
  const tmpBranchingC$3 = function () {
    debugger;
    const tmpCallCallee = f;
    const tmpCalleeParam = $(10);
    const tmpReturnArg$21 = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg$21;
  };
  if ($) {
    const tmpReturnArg$23 = tmpBranchingA$3();
    return tmpReturnArg$23;
  } else {
    const tmpReturnArg$25 = tmpBranchingB$3();
    return tmpReturnArg$25;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = h();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpBranchingC$3 = function () {
  debugger;
  const tmpCalleeParam = $(10);
  const g = function () {
    debugger;
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
      return tmpCalleeParam;
    } else {
      return tmpCalleeParam;
    }
  };
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$1 = g();
    return tmpReturnArg$1;
  } else {
    return tmpCalleeParam;
  }
};
const h = function () {
  debugger;
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$17 = tmpBranchingC$3();
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$25 = tmpBranchingC$3();
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
