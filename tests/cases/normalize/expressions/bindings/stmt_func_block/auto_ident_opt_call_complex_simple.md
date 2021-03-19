# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident opt call complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $($)?.(1);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = $($)?.(1);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (a$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$1) {
    const tmpChainElementCall$3 = tmpChainElementCall$2.call(tmpChainRootCall$1, 1);
    a$1 = tmpChainElementCall$3;
    const tmpReturnArg = tmpBranchingC(a$1, tmpChainRootCall$1, tmpChainElementCall$2, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpChainRootCall$2, tmpChainElementCall$4, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpChainRootCall$3, tmpChainElementCall$5, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$3 = tmpChainElementCall.call($, 1);
    $(tmpChainElementCall$3);
    return undefined;
  } else {
    $(undefined);
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
