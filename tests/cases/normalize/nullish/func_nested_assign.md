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
    let tmpObjLitVal$3 = $$0;
    let tmpObjLitVal$5 = $$1;
    let obj$1 = $$2;
    let tmpAssignMemLhsObj$1 = $$3;
    let tmpCallCallee$1 = $$4;
    let tmpCalleeParam$1 = $$5;
    let tmpIfTest$1 = $$6;
    debugger;
    tmpCalleeParam$1 = a;
    const tmpReturnArg$3 = tmpBranchingC(
      tmpObjLitVal$3,
      tmpObjLitVal$5,
      obj$1,
      tmpAssignMemLhsObj$1,
      tmpCallCallee$1,
      tmpCalleeParam$1,
      tmpIfTest$1,
    );
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$7 = $$0;
    let tmpObjLitVal$9 = $$1;
    let obj$3 = $$2;
    let tmpAssignMemLhsObj$3 = $$3;
    let tmpCallCallee$3 = $$4;
    let tmpCalleeParam$3 = $$5;
    let tmpIfTest$3 = $$6;
    debugger;
    const tmpReturnArg$5 = tmpBranchingC(
      tmpObjLitVal$7,
      tmpObjLitVal$9,
      obj$3,
      tmpAssignMemLhsObj$3,
      tmpCallCallee$3,
      tmpCalleeParam$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6) {
    let tmpObjLitVal$11 = $$0;
    let tmpObjLitVal$13 = $$1;
    let obj$5 = $$2;
    let tmpAssignMemLhsObj$5 = $$3;
    let tmpCallCallee$5 = $$4;
    let tmpCalleeParam$5 = $$5;
    let tmpIfTest$5 = $$6;
    debugger;
    const tmpIfTest$7 = tmpCalleeParam$5 == null;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$15 = $$0;
      let tmpObjLitVal$17 = $$1;
      let obj$7 = $$2;
      let tmpAssignMemLhsObj$7 = $$3;
      let tmpCallCallee$7 = $$4;
      let tmpCalleeParam$7 = $$5;
      let tmpIfTest$9 = $$6;
      let tmpIfTest$11 = $$7;
      debugger;
      tmpCalleeParam$7 = b;
      const tmpReturnArg$9 = tmpBranchingC$1(
        tmpObjLitVal$15,
        tmpObjLitVal$17,
        obj$7,
        tmpAssignMemLhsObj$7,
        tmpCallCallee$7,
        tmpCalleeParam$7,
        tmpIfTest$9,
        tmpIfTest$11,
      );
      return tmpReturnArg$9;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$19 = $$0;
      let tmpObjLitVal$21 = $$1;
      let obj$9 = $$2;
      let tmpAssignMemLhsObj$9 = $$3;
      let tmpCallCallee$9 = $$4;
      let tmpCalleeParam$9 = $$5;
      let tmpIfTest$13 = $$6;
      let tmpIfTest$15 = $$7;
      debugger;
      const tmpReturnArg$11 = tmpBranchingC$1(
        tmpObjLitVal$19,
        tmpObjLitVal$21,
        obj$9,
        tmpAssignMemLhsObj$9,
        tmpCallCallee$9,
        tmpCalleeParam$9,
        tmpIfTest$13,
        tmpIfTest$15,
      );
      return tmpReturnArg$11;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpObjLitVal$23 = $$0;
      let tmpObjLitVal$25 = $$1;
      let obj$11 = $$2;
      let tmpAssignMemLhsObj$11 = $$3;
      let tmpCallCallee$11 = $$4;
      let tmpCalleeParam$11 = $$5;
      let tmpIfTest$17 = $$6;
      let tmpIfTest$19 = $$7;
      debugger;
      const tmpReturnArg$7 = tmpCallCallee$11(tmpCalleeParam$11);
      return tmpReturnArg$7;
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$13 = tmpBranchingA$1(
        tmpObjLitVal$11,
        tmpObjLitVal$13,
        obj$5,
        tmpAssignMemLhsObj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$5,
        tmpIfTest$7,
      );
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(
        tmpObjLitVal$11,
        tmpObjLitVal$13,
        obj$5,
        tmpAssignMemLhsObj$5,
        tmpCallCallee$5,
        tmpCalleeParam$5,
        tmpIfTest$5,
        tmpIfTest$7,
      );
      return tmpReturnArg$15;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$17 = tmpBranchingA(tmpObjLitVal$1, tmpObjLitVal, obj, tmpAssignMemLhsObj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$17;
  } else {
    const tmpReturnArg$19 = tmpBranchingB(tmpObjLitVal$1, tmpObjLitVal, obj, tmpAssignMemLhsObj, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$19;
  }
};
const tmpCallCallee$13 = $;
const tmpCalleeParam$13 = f();
tmpCallCallee$13(tmpCalleeParam$13);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0, $$1) {
  const tmpCallCallee$5 = $$0;
  const tmpCalleeParam$5 = $$1;
  debugger;
  const tmpIfTest$7 = tmpCalleeParam$5 == null;
  if (tmpIfTest$7) {
    const SSA_tmpCalleeParam$7 = b;
    const tmpReturnArg$9 = tmpCallCallee$5(SSA_tmpCalleeParam$7);
    return tmpReturnArg$9;
  } else {
    const tmpReturnArg$15 = tmpCallCallee$5(tmpCalleeParam$5);
    return tmpReturnArg$15;
  }
};
const f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpIfTest = obj == null;
  if (tmpIfTest) {
    const SSA_tmpCalleeParam$1 = a;
    const tmpReturnArg$3 = tmpBranchingC($, SSA_tmpCalleeParam$1);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$19 = tmpBranchingC($, obj);
    return tmpReturnArg$19;
  }
};
const tmpCalleeParam$13 = f();
$(tmpCalleeParam$13);
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
