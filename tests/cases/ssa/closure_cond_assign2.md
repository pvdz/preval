# Preval test case

# closure_cond_assign2.md

> Ssa > Closure cond assign2
>
> Cannot SSA because g(true) g(false) should not have the same value for x

Regression; x was ending up an implicit global

#TODO

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function(t) {
    if (t) {
      x = x + 1;
    }
    $(x);
    $();
  }
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
}
if ($) $(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
    }
    $(x);
    $();
  };
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    const tmpBranchingA = function () {
      debugger;
      x = x + 1;
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
      $(x);
      $();
      return undefined;
    };
    if (t) {
      const tmpReturnArg$3 = tmpBranchingA();
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$5 = tmpBranchingB();
      return tmpReturnArg$5;
    }
  };
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
  return undefined;
};
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = f();
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  const tmpBranchingC = function () {
    debugger;
    $(x);
    $();
    return undefined;
  };
  let x = 0;
  const $clone$g$0_Ffalse = function () {
    debugger;
    tmpBranchingC();
    return undefined;
  };
  const $clone$g$0_Ttrue = function () {
    debugger;
    x = x + 1;
    tmpBranchingC();
    return undefined;
  };
  $clone$g$0_Ttrue();
  $clone$g$0_Ffalse();
  $clone$g$0_Ttrue();
  $clone$g$0_Ffalse();
  $clone$g$0_Ffalse();
  $clone$g$0_Ttrue();
  $clone$g$0_Ttrue();
  $(undefined);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 1
 - 4: 
 - 5: 2
 - 6: 
 - 7: 2
 - 8: 
 - 9: 2
 - 10: 
 - 11: 3
 - 12: 
 - 13: 4
 - 14: 
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same