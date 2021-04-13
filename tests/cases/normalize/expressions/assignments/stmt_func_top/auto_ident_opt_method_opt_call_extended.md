# Preval test case

# auto_ident_opt_method_opt_call_extended.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt method opt call extended
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { c: { d: { e: $ } } };

  let a = { a: 999, b: 1000 };
  a = b?.c.d.e?.(1);
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
  a = b?.c.d.e?.(1);
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
    const tmpIfTest$3 = tmpChainElementObject$9 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainElementCall$3 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
      a = tmpChainElementCall$3;
      const tmpReturnArg = tmpBranchingC$1();
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC();
      return tmpReturnArg$3;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1();
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB$1();
      return tmpReturnArg$7;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$9 = tmpBranchingC();
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function () {
    debugger;
    $(a);
    return undefined;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA();
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
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
const tmpBranchingA = function () {
  debugger;
  const tmpChainElementObject$5 = b.c;
  const tmpChainElementObject$7 = tmpChainElementObject$5.d;
  const tmpChainElementObject$9 = tmpChainElementObject$7.e;
  const tmpIfTest$3 = tmpChainElementObject$9 != null;
  if (tmpIfTest$3) {
    const tmpChainElementCall$3 = tmpChainElementObject$9.call(tmpChainElementObject$7, 1);
    tmpSSA_a = tmpChainElementCall$3;
    tmpBranchingC();
    return undefined;
  } else {
    tmpBranchingC();
    return undefined;
  }
};
const tmpBranchingC = function () {
  debugger;
  $(tmpSSA_a);
  return undefined;
};
if (tmpIfTest) {
  tmpBranchingA();
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
