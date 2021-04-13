# Preval test case

# auto_ident_opt_method_call_extended.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt method call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: { d: { e: $ } } };

  let a = { a: 999, b: 1000 };
  a = b?.c.d.e(1);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: { d: { e: $ } } };
  let a = { a: 999, b: 1000 };
  a = b?.c.d.e(1);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = { e: $ };
  const tmpObjLitVal = { d: tmpObjLitVal$1 };
  let b = { c: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp.c;
    const tmpChainElementObject$7 = tmpChainElementObject$5.d;
    const tmpChainElementObject$9 = tmpChainElementObject$7.e;
    const tmpChainElementCall$1 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    a = tmpChainElementCall$1;
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
const tmpObjLitVal$1 = { e: $ };
const tmpObjLitVal = { d: tmpObjLitVal$1 };
const b = { c: tmpObjLitVal };
let tmpSSA_a = undefined;
const tmpIfTest = b != null;
const tmpBranchingC = function () {
  debugger;
  $(tmpSSA_a);
  return undefined;
};
if (tmpIfTest) {
  const tmpChainElementObject$5 = b.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpChainElementCall$1 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
  tmpSSA_a = tmpChainElementCall$1;
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
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
