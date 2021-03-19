# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Return > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: $ };

let a = { a: 999, b: 1000 };
function f() {
  return b?.c(1);
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return b?.c(1);
};
let b = { c: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (tmpReturnArg$1, tmpChainRootProp$1, tmpIfTest$1) {
    const tmpChainElementObject$1 = tmpChainRootProp$1.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainRootProp$1, 1);
    tmpReturnArg$1 = tmpChainElementCall$1;
    const tmpReturnArg$4 = tmpBranchingC(tmpReturnArg$1, tmpChainRootProp$1, tmpIfTest$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpReturnArg$2, tmpChainRootProp$2, tmpIfTest$2) {
    const tmpReturnArg$5 = tmpBranchingC(tmpReturnArg$2, tmpChainRootProp$2, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpReturnArg$3, tmpChainRootProp$3, tmpIfTest$3) {
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpReturnArg, tmpChainRootProp, tmpIfTest);
    return tmpReturnArg$7;
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
  const tmpIfTest = b != null;
  if (tmpIfTest) {
    const tmpChainElementObject$1 = b.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(b, 1);
    return tmpChainElementCall$1;
  } else {
    return undefined;
  }
};
const b = { c: $ };
const a = { a: 999, b: 1000 };
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
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
