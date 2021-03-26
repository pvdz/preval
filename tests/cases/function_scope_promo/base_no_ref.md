# Preval test case

# base_no_ref.md

> Function scope promo > Base no ref
>
> Functions that do not reference anything from the scope where they are defined should be moved to the first outer scope where they do reference a binding, or global. Whichever comes first.

#TODO

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
      return $(10);
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
        const tmpReturnArg$3 = $(10);
        return tmpReturnArg$3;
      };
      if ($) {
        const tmpReturnArg$5 = tmpBranchingA();
        return tmpReturnArg$5;
      } else {
        const tmpReturnArg$7 = tmpBranchingB();
        return tmpReturnArg$7;
      }
    };
    const tmpBranchingA$1 = function ($$0) {
      let g$1 = $$0;
      debugger;
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$9 = tmpBranchingC$1(g$1);
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function ($$0) {
      let g$3 = $$0;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC$1(g$3);
      return tmpReturnArg$11;
    };
    const tmpBranchingC$1 = function ($$0) {
      let g$5 = $$0;
      debugger;
      const tmpReturnArg$13 = g$5();
      return tmpReturnArg$13;
    };
    if ($) {
      const tmpReturnArg$15 = tmpBranchingA$1(g);
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(g);
      return tmpReturnArg$17;
    }
  };
  const tmpBranchingA$3 = function ($$0) {
    let f$1 = $$0;
    debugger;
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$19 = tmpBranchingC$3(f$1);
    return tmpReturnArg$19;
  };
  const tmpBranchingB$3 = function ($$0) {
    let f$3 = $$0;
    debugger;
    const tmpReturnArg$21 = tmpBranchingC$3(f$3);
    return tmpReturnArg$21;
  };
  const tmpBranchingC$3 = function ($$0) {
    let f$5 = $$0;
    debugger;
    const tmpReturnArg$23 = f$5();
    return tmpReturnArg$23;
  };
  if ($) {
    const tmpReturnArg$25 = tmpBranchingA$3(f);
    return tmpReturnArg$25;
  } else {
    const tmpReturnArg$27 = tmpBranchingB$3(f);
    return tmpReturnArg$27;
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
        const tmpReturnArg = $(10);
        return tmpReturnArg;
      } else {
        const tmpReturnArg$7 = $(10);
        return tmpReturnArg$7;
      }
    };
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$9 = g();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$17 = g();
      return tmpReturnArg$17;
    }
  };
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$19 = f();
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$27 = f();
    return tmpReturnArg$27;
  }
};
const tmpCalleeParam = h();
$(tmpCalleeParam);
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
 - 7: 'prevent'
 - 8: 'simple'
 - 9: 'inlining'
 - 10: 10
 - 11: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
