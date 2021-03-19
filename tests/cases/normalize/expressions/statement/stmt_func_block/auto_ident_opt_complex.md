# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident opt complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = { a: 999, b: 1000 };
    $(b)?.x;
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { x: 1 };
    let a = { a: 999, b: 1000 };
    $(b)?.x;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (b$1, a$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
    const tmpReturnArg = tmpBranchingC(b$1, a$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(b$2, a$2, tmpChainRootCall$2, tmpChainElementCall$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (b$3, a$3, tmpChainRootCall$3, tmpChainElementCall$3, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(b, a, tmpChainRootCall, tmpChainElementCall, tmpIfTest);
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
  const b = { x: 1 };
  const a = { a: 999, b: 1000 };
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    tmpChainElementCall.x;
    $(a);
    return undefined;
  } else {
    $(a);
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
 - 1: { x: '1' }
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
