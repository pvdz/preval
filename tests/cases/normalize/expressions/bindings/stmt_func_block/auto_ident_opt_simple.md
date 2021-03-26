# Preval test case

# auto_ident_opt_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident opt simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: 1 };

    let a = b?.x;
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let b = { x: 1 };
    let a = b?.x;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let b$1 = $$0;
    let a$1 = $$1;
    let tmpChainRootProp$1 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.x;
    a$1 = tmpChainElementObject$1;
    const tmpReturnArg = tmpBranchingC(b$1, a$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let b$3 = $$0;
    let a$3 = $$1;
    let tmpChainRootProp$3 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(b$3, a$3, tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let b$5 = $$0;
    let a$5 = $$1;
    let tmpChainRootProp$5 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(b, a, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const b = { x: 1 };
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = b.x;
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
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
