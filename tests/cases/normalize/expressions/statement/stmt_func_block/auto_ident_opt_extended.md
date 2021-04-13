# Preval test case

# auto_ident_opt_extended.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident opt extended
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { x: { y: { z: 100 } } };

    let a = { a: 999, b: 1000 };
    b?.x.y.z;
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
    let b = { x: { y: { z: 100 } } };
    let a = { a: 999, b: 1000 };
    b?.x.y.z;
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = { z: 100 };
  const tmpObjLitVal = { y: tmpObjLitVal$1 };
  let b = { x: tmpObjLitVal };
  let a = { a: 999, b: 1000 };
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$5 = tmpChainRootProp.x;
    const tmpChainElementObject$7 = tmpChainElementObject$5.y;
    const tmpChainElementObject$9 = tmpChainElementObject$7.z;
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
const tmpObjLitVal$1 = { z: 100 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const b = { x: tmpObjLitVal };
const a = { a: 999, b: 1000 };
const tmpIfTest = b != null;
const tmpBranchingC = function () {
  debugger;
  $(a);
  return undefined;
};
if (tmpIfTest) {
  const tmpChainElementObject$5 = b.x;
  const tmpChainElementObject$7 = tmpChainElementObject$5.y;
  tmpChainElementObject$7.z;
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
 - 1: { a: '999', b: '1000' }
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
