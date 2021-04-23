# Preval test case

# func_nested_assign.md

> Normalize > Nullish > Func nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj??a??b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  obj.a.b = 15;
  return $(obj ?? a ?? b);
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingA = function () {
    debugger;
    tmpCalleeParam = a;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpCalleeParam == null;
    const tmpBranchingA$1 = function () {
      debugger;
      tmpCalleeParam = b;
      const tmpReturnArg$5 = tmpBranchingC$1();
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function () {
      debugger;
      const tmpReturnArg$7 = tmpBranchingC$1();
      return tmpReturnArg$7;
    };
    const tmpBranchingC$1 = function () {
      debugger;
      tmpReturnArg = tmpCallCallee(tmpCalleeParam);
      return tmpReturnArg;
    };
    if (tmpIfTest$1) {
      const tmpReturnArg$9 = tmpBranchingA$1();
      return tmpReturnArg$9;
    } else {
      const tmpReturnArg$11 = tmpBranchingB$1();
      return tmpReturnArg$11;
    }
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  const tmpBranchingC = function () {
    debugger;
    const tmpIfTest$1 = tmpCalleeParam == null;
    if (tmpIfTest$1) {
      tmpCalleeParam = b;
      const tmpReturnArg$5 = $(tmpCalleeParam);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$11 = $(tmpCalleeParam);
      return tmpReturnArg$11;
    }
  };
  if (tmpIfTest) {
    tmpCalleeParam = a;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$15 = tmpBranchingC();
    return tmpReturnArg$15;
  }
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

BAD@! Found 2 implicit global bindings:

b, a

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"15"}' }
 - 3: { a: '{"b":"15"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
