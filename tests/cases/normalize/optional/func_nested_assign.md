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
  const obj = { a: { b: $() } };
  obj.a.b = 15;
  return $(obj?.a?.b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpCallCallee = $;
  let tmpCalleeParam = undefined;
  const tmpChainRootProp = obj;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function (
    tmpObjLitVal$2,
    tmpObjLitVal$3,
    obj$1,
    tmpAssignMemLhsObj$1,
    tmpCallCallee$1,
    tmpCalleeParam$1,
    tmpChainRootProp$1,
    tmpIfTest$2,
  ) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.a;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    const tmpBranchingA$1 = function (
      tmpObjLitVal$8,
      tmpObjLitVal$9,
      obj$4,
      tmpAssignMemLhsObj$4,
      tmpCallCallee$4,
      tmpCalleeParam$4,
      tmpChainRootProp$4,
      tmpIfTest$6,
      tmpChainElementObject$4,
      tmpIfTest$7,
    ) {
      const tmpChainElementObject$5 = tmpChainElementObject$4.b;
      tmpCalleeParam$4 = tmpChainElementObject$5;
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpObjLitVal$8,
        tmpObjLitVal$9,
        obj$4,
        tmpAssignMemLhsObj$4,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpChainRootProp$4,
        tmpIfTest$6,
        tmpChainElementObject$4,
        tmpIfTest$7,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function (
      tmpObjLitVal$10,
      tmpObjLitVal$11,
      obj$5,
      tmpAssignMemLhsObj$5,
      tmpCallCallee$5,
      tmpCalleeParam$5,
      tmpChainRootProp$5,
      tmpIfTest$8,
      tmpChainElementObject$6,
      tmpIfTest$9,
    ) {
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        obj$5,
        tmpAssignMemLhsObj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpChainRootProp$5,
        tmpIfTest$8,
        tmpChainElementObject$6,
        tmpIfTest$9,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function (
      tmpObjLitVal$12,
      tmpObjLitVal$13,
      obj$6,
      tmpAssignMemLhsObj$6,
      tmpCallCallee$6,
      tmpCalleeParam$6,
      tmpChainRootProp$6,
      tmpIfTest$10,
      tmpChainElementObject$7,
      tmpIfTest$11,
    ) {
      const tmpReturnArg$4 = tmpBranchingC(
        tmpObjLitVal$12,
        tmpObjLitVal$13,
        obj$6,
        tmpAssignMemLhsObj$6,
        tmpCallCallee$6,
        tmpCalleeParam$6,
        tmpChainRootProp$6,
        tmpIfTest$10,
      );
      return tmpReturnArg$4;
    };
    if (tmpIfTest$3) {
      const tmpReturnArg$5 = tmpBranchingA$1(
        tmpObjLitVal$2,
        tmpObjLitVal$3,
        obj$1,
        tmpAssignMemLhsObj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$6 = tmpBranchingB$1(
        tmpObjLitVal$2,
        tmpObjLitVal$3,
        obj$1,
        tmpAssignMemLhsObj$1,
        tmpCallCallee$1,
        tmpCalleeParam$1,
        tmpChainRootProp$1,
        tmpIfTest$2,
        tmpChainElementObject$2,
        tmpIfTest$3,
      );
      return tmpReturnArg$6;
    }
  };
  const tmpBranchingB = function (
    tmpObjLitVal$4,
    tmpObjLitVal$5,
    obj$2,
    tmpAssignMemLhsObj$2,
    tmpCallCallee$2,
    tmpCalleeParam$2,
    tmpChainRootProp$2,
    tmpIfTest$4,
  ) {
    const tmpReturnArg$7 = tmpBranchingC(
      tmpObjLitVal$4,
      tmpObjLitVal$5,
      obj$2,
      tmpAssignMemLhsObj$2,
      tmpCallCallee$2,
      tmpCalleeParam$2,
      tmpChainRootProp$2,
      tmpIfTest$4,
    );
    return tmpReturnArg$7;
  };
  const tmpBranchingC = function (
    tmpObjLitVal$6,
    tmpObjLitVal$7,
    obj$3,
    tmpAssignMemLhsObj$3,
    tmpCallCallee$3,
    tmpCalleeParam$3,
    tmpChainRootProp$3,
    tmpIfTest$5,
  ) {
    const tmpReturnArg$1 = tmpCallCallee$3(tmpCalleeParam$3);
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA(
      tmpObjLitVal$1,
      tmpObjLitVal,
      obj,
      tmpAssignMemLhsObj,
      tmpCallCallee,
      tmpCalleeParam,
      tmpChainRootProp,
      tmpIfTest,
    );
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(
      tmpObjLitVal$1,
      tmpObjLitVal,
      obj,
      tmpAssignMemLhsObj,
      tmpCallCallee,
      tmpCalleeParam,
      tmpChainRootProp,
      tmpIfTest,
    );
    return tmpReturnArg$9;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpIfTest = obj != null;
  const tmpBranchingA = function (tmpCallCallee$1, tmpCalleeParam$1, tmpChainRootProp$1) {
    const tmpChainElementObject$2 = tmpChainRootProp$1.a;
    const tmpIfTest$3 = tmpChainElementObject$2 != null;
    if (tmpIfTest$3) {
      const tmpChainElementObject$5 = tmpChainElementObject$2.b;
      const tmpReturnArg$2 = tmpCallCallee$1(tmpChainElementObject$5);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$6 = tmpCallCallee$1(tmpCalleeParam$1);
      return tmpReturnArg$6;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$8 = tmpBranchingA($, undefined, obj);
    return tmpReturnArg$8;
  } else {
    const tmpReturnArg$9 = $(undefined);
    return tmpReturnArg$9;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
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
