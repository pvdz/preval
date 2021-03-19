# Preval test case

# auto_ident_opt_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident opt complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = $(b)?.x;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = $(b)?.x;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall(b);
  const tmpIfTest = tmpChainElementCall != null;
  const tmpBranchingA = function (b$1, a$1, tmpChainRootCall$1, tmpChainElementCall$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainElementCall$1.x;
    a$1 = tmpChainElementObject$1;
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
  const tmpChainElementCall = $(b);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = tmpChainElementCall.x;
    $(tmpChainElementObject$1);
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
 - 1: { x: '1' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
