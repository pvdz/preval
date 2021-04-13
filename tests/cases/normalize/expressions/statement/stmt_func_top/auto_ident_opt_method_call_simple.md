# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt method call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: $ };

  let a = { a: 999, b: 1000 };
  b?.c(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  b?.c(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: $ };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp.c;
    const tmpChainElementCall$1 = tmpChainElementObject$1.call(tmpChainRootProp, 1);
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
    $(a);
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const b = { c: $ };
const a = { a: 999, b: 1000 };
const tmpIfTest = b != null;
const tmpBranchingC = function () {
  debugger;
  $(a);
  return undefined;
};
if (tmpIfTest) {
  const tmpChainElementObject$1 = b.c;
  tmpChainElementObject$1.call(b, 1);
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
