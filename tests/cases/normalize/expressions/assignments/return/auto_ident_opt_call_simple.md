# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $?.(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = $?.(1));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest = tmpChainRootCall != null;
  const tmpBranchingA = function (tmpChainRootCall$1, tmpIfTest$1) {
    const tmpChainElementCall$1 = tmpChainRootCall$1(1);
    a = tmpChainElementCall$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpChainRootCall$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpChainRootCall$2, tmpIfTest$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootCall$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpChainRootCall$3, tmpIfTest$3) {
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpChainRootCall, tmpIfTest);
    return tmpReturnArg$5;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  a = undefined;
  const tmpIfTest = $ != null;
  const tmpBranchingC = function () {
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementCall$1 = $(1);
    a = tmpChainElementCall$1;
    const tmpReturnArg$2 = tmpBranchingC();
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
