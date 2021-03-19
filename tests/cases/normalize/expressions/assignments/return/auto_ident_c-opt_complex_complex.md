# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident c-opt complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = $(b)?.[$("x")]);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = $(b)?.[$('x')]);
};
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1) {
    const tmpChainRootComputed$1 = $('x');
    const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
    const tmpReturnArg$2 = tmpBranchingC(tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1);
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function (tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2) {
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2);
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function (tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$3) {
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$4 = tmpBranchingA(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$4;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$5;
  }
};
let b = { x: 1 };
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
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingC = function () {
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainRootComputed$1 = $('x');
    const tmpChainElementObject$1 = tmpChainElementCall[tmpChainRootComputed$1];
    a = tmpChainElementObject$1;
    const tmpReturnArg$2 = tmpBranchingC();
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
const b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
