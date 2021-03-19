# Preval test case

# auto_ident_c-opt_simple_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident c-opt simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  b?.["x"];
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  b?.['x'];
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (b$1, a$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainRootComputed$1 = 'x';
    const tmpChainElementObject$1 = tmpChainRootProp$1[tmpChainRootComputed$1];
    const tmpReturnArg = tmpBranchingC(b$1, a$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (b$2, a$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(b$2, a$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (b$3, a$3, tmpChainRootProp$3, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(b, a, tmpChainRootProp, tmpIfTest);
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
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    b.x;
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
 - 1: { a: '999', b: '1000' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
