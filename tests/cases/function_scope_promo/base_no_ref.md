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
        const tmpReturnArg$2 = $(10);
        return tmpReturnArg$2;
      };
      if ($) {
        const tmpReturnArg$3 = tmpBranchingA();
        return tmpReturnArg$3;
      } else {
        const tmpReturnArg$4 = tmpBranchingB();
        return tmpReturnArg$4;
      }
    };
    const tmpBranchingA$1 = function ($$0) {
      let g$1 = $$0;
      debugger;
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$5 = tmpBranchingC$1(g$1);
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0) {
      let g$2 = $$0;
      debugger;
      const tmpReturnArg$6 = tmpBranchingC$1(g$2);
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function ($$0) {
      let g$3 = $$0;
      debugger;
      const tmpReturnArg$7 = g$3();
      return tmpReturnArg$7;
    };
    if ($) {
      const tmpReturnArg$8 = tmpBranchingA$1(g);
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(g);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingA$2 = function ($$0) {
    let f$1 = $$0;
    debugger;
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$10 = tmpBranchingC$2(f$1);
    return tmpReturnArg$10;
  };
  const tmpBranchingB$2 = function ($$0) {
    let f$2 = $$0;
    debugger;
    const tmpReturnArg$11 = tmpBranchingC$2(f$2);
    return tmpReturnArg$11;
  };
  const tmpBranchingC$2 = function ($$0) {
    let f$3 = $$0;
    debugger;
    const tmpReturnArg$12 = f$3();
    return tmpReturnArg$12;
  };
  if ($) {
    const tmpReturnArg$13 = tmpBranchingA$2(f);
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$14 = tmpBranchingB$2(f);
    return tmpReturnArg$14;
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
        const tmpReturnArg$4 = $(10);
        return tmpReturnArg$4;
      }
    };
    if ($) {
      $('prevent');
      $('simple');
      $('inlining');
      const tmpReturnArg$5 = g();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$9 = g();
      return tmpReturnArg$9;
    }
  };
  if ($) {
    $('prevent');
    $('simple');
    $('inlining');
    const tmpReturnArg$10 = f();
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$14 = f();
    return tmpReturnArg$14;
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
