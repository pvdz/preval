# Preval test case

# func_nested_assign.md

> Normalize > Optional > Func nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj?.a?.b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  obj.a.b = 15;
  return $(obj?.a?.b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$3 = tmpChainRootProp.a;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    const tmpBranchingA$1 = function () {
      debugger;
      const tmpChainElementObject$7 = tmpChainElementObject$3.b;
      tmpCalleeParam = tmpChainElementObject$7;
      const tmpReturnArg$1 = tmpBranchingC$1();
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1();
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      const tmpReturnArg$5 = tmpBranchingC();
      return tmpReturnArg$5;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$7 = tmpBranchingA$1();
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1();
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$11 = tmpBranchingC();
    return tmpReturnArg$11;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = tmpBranchingB();
    return tmpReturnArg$15;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  let tmpCalleeParam = undefined;
  const tmpIfTest = obj != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$3 = obj.a;
    const tmpIfTest$3 = tmpChainElementObject$3 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$7 = tmpChainElementObject$3.b;
      tmpCalleeParam = tmpChainElementObject$7;
      const tmpReturnArg$1 = $(tmpCalleeParam);
      return tmpReturnArg$1;
    } else {
      const tmpReturnArg$9 = $(tmpCalleeParam);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$13 = tmpBranchingA();
    return tmpReturnArg$13;
  } else {
    const tmpReturnArg$15 = $(tmpCalleeParam);
    return tmpReturnArg$15;
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: 15
 - 3: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
