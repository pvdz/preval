# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident opt method call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
function f() {
  return (a = b?.c(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = b?.c(1));
};
let b = { c: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function ($$0, $$1) {
    let tmpChainRootProp$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainRootProp$1, 1);
    a = tmpChainElementCall$1;
    const tmpReturnArg$3 = tmpBranchingC(tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpChainRootProp$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(tmpChainRootProp$3, tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpChainRootProp$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$9;
  }
};
let b = { c: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  a = undefined;
  const tmpIfTest = b != null;
  const tmpBranchingC = function () {
    debugger;
    const tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpChainElementObject$1 = b.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(b, 1);
    a = tmpChainElementCall$1;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  }
};
const b = { c: $ };
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
