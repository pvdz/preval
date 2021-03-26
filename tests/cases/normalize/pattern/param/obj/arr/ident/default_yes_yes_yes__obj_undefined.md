# Preval test case

# default_yes_yes_yes__obj_undefined.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'fail'] = $(['pass2']) } = $({ x: ['pass3'] })) {
  return y;
}
$(f({ x: undefined, a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = 'fail'] = $(['pass2']) } = tmpParamBare === undefined ? $({ x: ['pass3'] }) : tmpParamBare;
  return y;
};
$(f({ x: undefined, a: 11, b: 12 }, 10));
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
    const tmpObjLitVal$1 = ['pass3'];
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
    let objPatternBeforeDefault$1 = bindingPatternObjRoot$5.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$7 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let tmpIfTest$9 = $$2;
      let objPatternBeforeDefault$3 = $$3;
      let objPatternAfterDefault$3 = $$4;
      let tmpIfTest$11 = $$5;
      debugger;
      const tmpCallCallee$5 = $;
      const tmpCalleeParam$5 = ['pass2'];
      objPatternAfterDefault$3 = tmpCallCallee$5(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        tmpIfTest$9,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let tmpIfTest$13 = $$2;
      let objPatternBeforeDefault$5 = $$3;
      let objPatternAfterDefault$5 = $$4;
      let tmpIfTest$15 = $$5;
      debugger;
      objPatternAfterDefault$5 = objPatternBeforeDefault$5;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        tmpIfTest$13,
        objPatternBeforeDefault$5,
        objPatternAfterDefault$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let tmpIfTest$17 = $$2;
      let objPatternBeforeDefault$7 = $$3;
      let objPatternAfterDefault$7 = $$4;
      let tmpIfTest$19 = $$5;
      debugger;
      let arrPatternSplat$3 = [...objPatternAfterDefault$7];
      let arrPatternBeforeDefault$3 = arrPatternSplat$3[0];
      let y$3 = undefined;
      const tmpIfTest$21 = arrPatternBeforeDefault$3 === undefined;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$13 = $$0;
        let bindingPatternObjRoot$13 = $$1;
        let tmpIfTest$23 = $$2;
        let objPatternBeforeDefault$9 = $$3;
        let objPatternAfterDefault$9 = $$4;
        let tmpIfTest$25 = $$5;
        let arrPatternSplat$5 = $$6;
        let arrPatternBeforeDefault$5 = $$7;
        let y$5 = $$8;
        let tmpIfTest$27 = $$9;
        debugger;
        y$5 = 'fail';
        const tmpReturnArg$7 = tmpBranchingC$3(
          tmpParamBare$13,
          bindingPatternObjRoot$13,
          tmpIfTest$23,
          objPatternBeforeDefault$9,
          objPatternAfterDefault$9,
          tmpIfTest$25,
          arrPatternSplat$5,
          arrPatternBeforeDefault$5,
          y$5,
          tmpIfTest$27,
        );
        return tmpReturnArg$7;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$15 = $$0;
        let bindingPatternObjRoot$15 = $$1;
        let tmpIfTest$29 = $$2;
        let objPatternBeforeDefault$11 = $$3;
        let objPatternAfterDefault$11 = $$4;
        let tmpIfTest$31 = $$5;
        let arrPatternSplat$7 = $$6;
        let arrPatternBeforeDefault$7 = $$7;
        let y$7 = $$8;
        let tmpIfTest$33 = $$9;
        debugger;
        y$7 = arrPatternBeforeDefault$7;
        const tmpReturnArg$9 = tmpBranchingC$3(
          tmpParamBare$15,
          bindingPatternObjRoot$15,
          tmpIfTest$29,
          objPatternBeforeDefault$11,
          objPatternAfterDefault$11,
          tmpIfTest$31,
          arrPatternSplat$7,
          arrPatternBeforeDefault$7,
          y$7,
          tmpIfTest$33,
        );
        return tmpReturnArg$9;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$17 = $$0;
        let bindingPatternObjRoot$17 = $$1;
        let tmpIfTest$35 = $$2;
        let objPatternBeforeDefault$13 = $$3;
        let objPatternAfterDefault$13 = $$4;
        let tmpIfTest$37 = $$5;
        let arrPatternSplat$9 = $$6;
        let arrPatternBeforeDefault$9 = $$7;
        let y$9 = $$8;
        let tmpIfTest$39 = $$9;
        debugger;
        return y$9;
      };
      if (tmpIfTest$21) {
        const tmpReturnArg$11 = tmpBranchingA$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          tmpIfTest$17,
          objPatternBeforeDefault$7,
          objPatternAfterDefault$7,
          tmpIfTest$19,
          arrPatternSplat$3,
          arrPatternBeforeDefault$3,
          y$3,
          tmpIfTest$21,
        );
        return tmpReturnArg$11;
      } else {
        const tmpReturnArg$13 = tmpBranchingB$3(
          tmpParamBare$11,
          bindingPatternObjRoot$11,
          tmpIfTest$17,
          objPatternBeforeDefault$7,
          objPatternAfterDefault$7,
          tmpIfTest$19,
          arrPatternSplat$3,
          arrPatternBeforeDefault$3,
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
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$15;
    } else {
      const tmpReturnArg$17 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$5,
        objPatternBeforeDefault$1,
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
const tmpCalleeParam$9 = { x: undefined, a: 11, b: 12 };
const tmpCalleeParam$11 = 10;
const tmpCalleeParam$7 = tmpCallCallee$9(tmpCalleeParam$9, tmpCalleeParam$11);
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0) {
    const bindingPatternObjRoot$5 = $$0;
    debugger;
    const objPatternBeforeDefault$1 = bindingPatternObjRoot$5.x;
    const tmpIfTest$7 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function ($$0) {
      const objPatternAfterDefault$7 = $$0;
      debugger;
      const arrPatternSplat$3 = [...objPatternAfterDefault$7];
      const arrPatternBeforeDefault$3 = arrPatternSplat$3[0];
      const tmpIfTest$21 = arrPatternBeforeDefault$3 === undefined;
      if (tmpIfTest$21) {
        return 'fail';
      } else {
        return arrPatternBeforeDefault$3;
      }
    };
    if (tmpIfTest$7) {
      const tmpCalleeParam$5 = ['pass2'];
      const SSA_objPatternAfterDefault$3 = $(tmpCalleeParam$5);
      const tmpReturnArg$3 = tmpBranchingC$1(SSA_objPatternAfterDefault$3);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$17 = tmpBranchingC$1(objPatternBeforeDefault$1);
      return tmpReturnArg$17;
    }
  };
  if (tmpIfTest) {
    const tmpObjLitVal$1 = ['pass3'];
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$21 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$21;
  }
};
const tmpCalleeParam$9 = { x: undefined, a: 11, b: 12 };
const tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
