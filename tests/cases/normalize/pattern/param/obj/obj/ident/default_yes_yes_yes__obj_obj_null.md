# Preval test case

# default_yes_yes_yes__obj_obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  obj obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) } = $({ x: { y: 'fail3' } })) {
  return y;
}
$(f({ x: { x: 1, y: null, z: 3 }, b: 11, c: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y = $('fail') } = $({ y: 'fail2' }) } = tmpParamBare === undefined ? $({ x: { y: 'fail3' } }) : tmpParamBare;
  return y;
};
$(f({ x: { x: 1, y: null, z: 3 }, b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpObjLitVal$1 = { y: 'fail3' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    bindingPatternObjRoot$3 = tmpParamBare$3;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$3, bindingPatternObjRoot$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    let objPatternBeforeDefault$3 = bindingPatternObjRoot$5.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$7 = objPatternBeforeDefault$3 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let objPatternBeforeDefault$7 = $$3;
      let objPatternAfterDefault$3 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = { y: 'fail2' };
      objPatternAfterDefault$3 = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        tmpIfTest$9,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let tmpIfTest$13 = $$2;
      let objPatternBeforeDefault$9 = $$3;
      let objPatternAfterDefault$5 = $$4;
      let tmpIfTest$15 = $$5;
      debugger;
      objPatternAfterDefault$5 = objPatternBeforeDefault$9;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        tmpIfTest$13,
        objPatternBeforeDefault$9,
        objPatternAfterDefault$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let tmpIfTest$17 = $$2;
      let objPatternBeforeDefault$11 = $$3;
      let objPatternAfterDefault$7 = $$4;
      let tmpIfTest$19 = $$5;
      debugger;
      let objPatternBeforeDefault$13 = objPatternAfterDefault$7.y;
      let y$3 = undefined;
      const tmpIfTest$21 = objPatternBeforeDefault$13 === undefined;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$13 = $$0;
        let bindingPatternObjRoot$13 = $$1;
        let tmpIfTest$23 = $$2;
        let objPatternBeforeDefault$15 = $$3;
        let objPatternAfterDefault$9 = $$4;
        let tmpIfTest$25 = $$5;
        let objPatternBeforeDefault$17 = $$6;
        let y$5 = $$7;
        let tmpIfTest$27 = $$8;
        debugger;
        y$5 = $('fail');
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternObjRoot$13,
          tmpIfTest$23,
          objPatternBeforeDefault$15,
          objPatternAfterDefault$9,
          tmpIfTest$25,
          objPatternBeforeDefault$17,
          y$5,
          tmpIfTest$27,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$15 = $$0;
        let bindingPatternObjRoot$15 = $$1;
        let tmpIfTest$29 = $$2;
        let objPatternBeforeDefault$19 = $$3;
        let objPatternAfterDefault$11 = $$4;
        let tmpIfTest$31 = $$5;
        let objPatternBeforeDefault$21 = $$6;
        let y$7 = $$7;
        let tmpIfTest$33 = $$8;
        debugger;
        y$7 = objPatternBeforeDefault$21;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternObjRoot$15,
          tmpIfTest$29,
          objPatternBeforeDefault$19,
          objPatternAfterDefault$11,
          tmpIfTest$31,
          objPatternBeforeDefault$21,
          y$7,
          tmpIfTest$33,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8) {
        let tmpParamBare$17 = $$0;
        let bindingPatternObjRoot$17 = $$1;
        let tmpIfTest$35 = $$2;
        let objPatternBeforeDefault$23 = $$3;
        let objPatternAfterDefault$13 = $$4;
        let tmpIfTest$37 = $$5;
        let objPatternBeforeDefault$25 = $$6;
        let y$9 = $$7;
        let tmpIfTest$39 = $$8;
        debugger;
        return y$9;
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$11 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          tmpIfTest$17,
          objPatternBeforeDefault$11,
          objPatternAfterDefault$7,
          tmpIfTest$19,
          objPatternBeforeDefault$13,
          y$3,
          tmpIfTest$21,
        );
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          tmpIfTest$17,
          objPatternBeforeDefault$11,
          objPatternAfterDefault$7,
          tmpIfTest$19,
          objPatternBeforeDefault$13,
          y$3,
          tmpIfTest$21,
        );
        return tmpReturnArg$13;
      }
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$15 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$21;
  }
};
const tmpCallCallee$7 = $;
const tmpCallCallee$9 = f;
const tmpObjLitVal$3 = { x: 1, y: null, z: 3 };
const tmpCalleeParam$9 = { x: tmpObjLitVal$3, b: 11, c: 12 };
const tmpCalleeParam$11 = 10;
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const bindingPatternObjRoot$5 = $$0;
  debugger;
  const objPatternBeforeDefault$3 = bindingPatternObjRoot$5.x;
  const tmpIfTest$7 = objPatternBeforeDefault$3 === undefined;
  if (tmpIfTest$7) {
    const tmpCalleeParam$5 = { y: 'fail2' };
    const SSA_objPatternAfterDefault$3 = $(tmpCalleeParam$5);
    const tmpReturnArg$3 = tmpBranchingC$1(SSA_objPatternAfterDefault$3);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$17 = tmpBranchingC$1(objPatternBeforeDefault$3);
    return tmpReturnArg$17;
  }
};
const tmpBranchingC$1 = function ($$0) {
  const objPatternAfterDefault$7 = $$0;
  debugger;
  const objPatternBeforeDefault$13 = objPatternAfterDefault$7.y;
  const tmpIfTest$21 = objPatternBeforeDefault$13 === undefined;
  if (tmpIfTest$21) {
    const tmpReturnArg$11 = $('fail');
    return tmpReturnArg$11;
  } else {
    return objPatternBeforeDefault$13;
  }
};
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal$1 = { y: 'fail3' };
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$21;
  }
};
const tmpObjLitVal$3 = { x: 1, y: null, z: 3 };
const tmpCalleeParam$9 = { x: tmpObjLitVal$3, b: 11, c: 12 };
const tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
