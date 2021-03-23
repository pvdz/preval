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
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$2 = $$0;
    let tmpObjLitVal$3 = $$1;
    let obj$1 = $$2;
    let tmpAssignMemLhsObj$1 = $$3;
    let tmpCallCallee$1 = $$4;
    let tmpCalleeParam$1 = $$5;
    let tmpIfTest$1 = $$6;
    debugger;
    tmpCalleeParam$1 = a;
    const tmpReturnArg$2 = tmpBranchingC(
      tmpObjLitVal$2,
      tmpObjLitVal$3,
      obj$1,
      tmpAssignMemLhsObj$1,
      tmpCallCallee$1,
      tmpCalleeParam$1,
      tmpIfTest$1,
    );
    return tmpReturnArg$2;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$4 = $$0;
    let tmpObjLitVal$5 = $$1;
    let obj$2 = $$2;
    let tmpAssignMemLhsObj$2 = $$3;
    let tmpCallCallee$2 = $$4;
    let tmpCalleeParam$2 = $$5;
    let tmpIfTest$2 = $$6;
    debugger;
    const tmpReturnArg$3 = tmpBranchingC(
      tmpObjLitVal$4,
      tmpObjLitVal$5,
      obj$2,
      tmpAssignMemLhsObj$2,
      tmpCallCallee$2,
      tmpCalleeParam$2,
      tmpIfTest$2,
    );
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$6 = $$0;
    let tmpObjLitVal$7 = $$1;
    let obj$3 = $$2;
    let tmpAssignMemLhsObj$3 = $$3;
    let tmpCallCallee$3 = $$4;
    let tmpCalleeParam$3 = $$5;
    let tmpIfTest$3 = $$6;
    debugger;
    const tmpIfTest$4 = tmpCalleeParam$3 == null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$8 = $$0;
      let tmpObjLitVal$9 = $$1;
      let obj$4 = $$2;
      let tmpAssignMemLhsObj$4 = $$3;
      let tmpCallCallee$4 = $$4;
      let tmpCalleeParam$4 = $$5;
      let tmpIfTest$5 = $$6;
      let tmpIfTest$6 = $$7;
      debugger;
      tmpCalleeParam$4 = b;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpObjLitVal$8,
        tmpObjLitVal$9,
        obj$4,
        tmpAssignMemLhsObj$4,
        tmpCallCallee$4,
        tmpCalleeParam$4,
        tmpIfTest$5,
        tmpIfTest$6,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$10 = $$0;
      let tmpObjLitVal$11 = $$1;
      let obj$5 = $$2;
      let tmpAssignMemLhsObj$5 = $$3;
      let tmpCallCallee$5 = $$4;
      let tmpCalleeParam$5 = $$5;
      let tmpIfTest$7 = $$6;
      let tmpIfTest$8 = $$7;
      debugger;
      const tmpReturnArg$6 = tmpBranchingC$1(
        tmpObjLitVal$10,
        tmpObjLitVal$11,
        obj$5,
        tmpAssignMemLhsObj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$7,
        tmpIfTest$8,
      );
      return tmpReturnArg$6;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$12 = $$0;
      let tmpObjLitVal$13 = $$1;
      let obj$6 = $$2;
      let tmpAssignMemLhsObj$6 = $$3;
      let tmpCallCallee$6 = $$4;
      let tmpCalleeParam$6 = $$5;
      let tmpIfTest$9 = $$6;
      let tmpIfTest$10 = $$7;
      debugger;
      const tmpReturnArg$4 = tmpCallCallee$6(tmpCalleeParam$6);
      return tmpReturnArg$4;
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpObjLitVal$6,
        tmpObjLitVal$7,
        obj$3,
        tmpAssignMemLhsObj$3,
        tmpCallCallee$3,
        tmpCalleeParam$3,
        tmpIfTest$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$8 = tmpBranchingB$1(
        tmpObjLitVal$6,
        tmpObjLitVal$7,
        obj$3,
        tmpAssignMemLhsObj$3,
        tmpCallCallee$3,
        tmpCalleeParam$3,
        tmpIfTest$3,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$9 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, obj, tmpAssignMemLhsObj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$10 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, obj, tmpAssignMemLhsObj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$10;
  }
};
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$7(tmpCalleeParam$7);
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
  const tmpIfTest = obj == null;
  const tmpBranchingC = function ($$0, $$1) {
    const tmpCallCallee$3 = $$0;
    const tmpCalleeParam$3 = $$1;
    debugger;
    const tmpIfTest$4 = tmpCalleeParam$3 == null;
    if (tmpIfTest$4) {
      const SSA_tmpCalleeParam$4 = b;
      const tmpReturnArg$5 = tmpCallCallee$3(SSA_tmpCalleeParam$4);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$8 = tmpCallCallee$3(tmpCalleeParam$3);
      return tmpReturnArg$8;
    }
  };
  if (tmpIfTest) {
    const SSA_tmpCalleeParam$1 = a;
    const tmpReturnArg$2 = tmpBranchingC($, SSA_tmpCalleeParam$1);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$10 = tmpBranchingC($, obj);
    return tmpReturnArg$10;
  }
};
const tmpCalleeParam$7 = f();
$(tmpCalleeParam$7);
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
