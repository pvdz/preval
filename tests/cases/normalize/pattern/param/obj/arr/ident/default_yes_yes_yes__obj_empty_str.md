# Preval test case

# default_yes_yes_yes__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Arr > Ident > Default yes yes yes  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: [y = 'pass'] = $(['fail2']) } = $({ x: ['fail3'] })) {
  return y;
}
$(f({ x: '', a: 11, b: 12 }, 10));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: [y = 'pass'] = $(['fail2']) } = tmpParamBare === undefined ? $({ x: ['fail3'] }) : tmpParamBare;
  return y;
};
$(f({ x: '', a: 11, b: 12 }, 10));
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
    const tmpObjLitVal$1 = ['fail3'];
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    bindingPatternObjRoot$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(tmpParamBare$1, bindingPatternObjRoot$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$2 = $$0;
    let bindingPatternObjRoot$2 = $$1;
    let tmpIfTest$2 = $$2;
    debugger;
    bindingPatternObjRoot$2 = tmpParamBare$2;
    const tmpReturnArg$1 = tmpBranchingC(tmpParamBare$2, bindingPatternObjRoot$2, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    let objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    let objPatternAfterDefault$1 = undefined;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$4 = $$0;
      let bindingPatternObjRoot$4 = $$1;
      let tmpIfTest$5 = $$2;
      let objPatternBeforeDefault$2 = $$3;
      let objPatternAfterDefault$2 = $$4;
      let tmpIfTest$6 = $$5;
      debugger;
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = ['fail2'];
      objPatternAfterDefault$2 = tmpCallCallee$3(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(
        tmpParamBare$4,
        bindingPatternObjRoot$4,
        tmpIfTest$5,
        objPatternBeforeDefault$2,
        objPatternAfterDefault$2,
        tmpIfTest$6,
      );
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$5 = $$0;
      let bindingPatternObjRoot$5 = $$1;
      let tmpIfTest$7 = $$2;
      let objPatternBeforeDefault$3 = $$3;
      let objPatternAfterDefault$3 = $$4;
      let tmpIfTest$8 = $$5;
      debugger;
      objPatternAfterDefault$3 = objPatternBeforeDefault$3;
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        tmpIfTest$7,
        objPatternBeforeDefault$3,
        objPatternAfterDefault$3,
        tmpIfTest$8,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5) {
      let tmpParamBare$6 = $$0;
      let bindingPatternObjRoot$6 = $$1;
      let tmpIfTest$9 = $$2;
      let objPatternBeforeDefault$4 = $$3;
      let objPatternAfterDefault$4 = $$4;
      let tmpIfTest$10 = $$5;
      debugger;
      let arrPatternSplat$2 = [...objPatternAfterDefault$4];
      let arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
      let y$2 = undefined;
      const tmpIfTest$11 = arrPatternBeforeDefault$2 === undefined;
      const tmpBranchingA$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$7 = $$0;
        let bindingPatternObjRoot$7 = $$1;
        let tmpIfTest$12 = $$2;
        let objPatternBeforeDefault$5 = $$3;
        let objPatternAfterDefault$5 = $$4;
        let tmpIfTest$13 = $$5;
        let arrPatternSplat$3 = $$6;
        let arrPatternBeforeDefault$3 = $$7;
        let y$3 = $$8;
        let tmpIfTest$14 = $$9;
        debugger;
        y$3 = 'pass';
        const tmpReturnArg$4 = tmpBranchingC$2(
          tmpParamBare$7,
          bindingPatternObjRoot$7,
          tmpIfTest$12,
          objPatternBeforeDefault$5,
          objPatternAfterDefault$5,
          tmpIfTest$13,
          arrPatternSplat$3,
          arrPatternBeforeDefault$3,
          y$3,
          tmpIfTest$14,
        );
        return tmpReturnArg$4;
      };
      const tmpBranchingB$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$8 = $$0;
        let bindingPatternObjRoot$8 = $$1;
        let tmpIfTest$15 = $$2;
        let objPatternBeforeDefault$6 = $$3;
        let objPatternAfterDefault$6 = $$4;
        let tmpIfTest$16 = $$5;
        let arrPatternSplat$4 = $$6;
        let arrPatternBeforeDefault$4 = $$7;
        let y$4 = $$8;
        let tmpIfTest$17 = $$9;
        debugger;
        y$4 = arrPatternBeforeDefault$4;
        const tmpReturnArg$5 = tmpBranchingC$2(
          tmpParamBare$8,
          bindingPatternObjRoot$8,
          tmpIfTest$15,
          objPatternBeforeDefault$6,
          objPatternAfterDefault$6,
          tmpIfTest$16,
          arrPatternSplat$4,
          arrPatternBeforeDefault$4,
          y$4,
          tmpIfTest$17,
        );
        return tmpReturnArg$5;
      };
      const tmpBranchingC$2 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7, $$8, $$9) {
        let tmpParamBare$9 = $$0;
        let bindingPatternObjRoot$9 = $$1;
        let tmpIfTest$18 = $$2;
        let objPatternBeforeDefault$7 = $$3;
        let objPatternAfterDefault$7 = $$4;
        let tmpIfTest$19 = $$5;
        let arrPatternSplat$5 = $$6;
        let arrPatternBeforeDefault$5 = $$7;
        let y$5 = $$8;
        let tmpIfTest$20 = $$9;
        debugger;
        return y$5;
      };
      if (tmpIfTest$11) {
        const tmpReturnArg$6 = tmpBranchingA$2(
          tmpParamBare$6,
          bindingPatternObjRoot$6,
          tmpIfTest$9,
          objPatternBeforeDefault$4,
          objPatternAfterDefault$4,
          tmpIfTest$10,
          arrPatternSplat$2,
          arrPatternBeforeDefault$2,
          y$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$6;
      } else {
        const tmpReturnArg$7 = tmpBranchingB$2(
          tmpParamBare$6,
          bindingPatternObjRoot$6,
          tmpIfTest$9,
          objPatternBeforeDefault$4,
          objPatternAfterDefault$4,
          tmpIfTest$10,
          arrPatternSplat$2,
          arrPatternBeforeDefault$2,
          y$2,
          tmpIfTest$11,
        );
        return tmpReturnArg$7;
      }
    };
    if (tmpIfTest$4) {
      const tmpReturnArg$8 = tmpBranchingA$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$8;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$3,
        bindingPatternObjRoot$3,
        tmpIfTest$3,
        objPatternBeforeDefault$1,
        objPatternAfterDefault$1,
        tmpIfTest$4,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$10 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$10;
  } else {
    const tmpReturnArg$11 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, tmpIfTest);
    return tmpReturnArg$11;
  }
};
const tmpCallCallee$4 = $;
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { x: '', a: 11, b: 12 };
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$5(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$4(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingC = function ($$0) {
    const bindingPatternObjRoot$3 = $$0;
    debugger;
    const objPatternBeforeDefault$1 = bindingPatternObjRoot$3.x;
    const tmpIfTest$4 = objPatternBeforeDefault$1 === undefined;
    const tmpBranchingC$1 = function ($$0) {
      const objPatternAfterDefault$4 = $$0;
      debugger;
      const arrPatternSplat$2 = [...objPatternAfterDefault$4];
      const arrPatternBeforeDefault$2 = arrPatternSplat$2[0];
      const tmpIfTest$11 = arrPatternBeforeDefault$2 === undefined;
      if (tmpIfTest$11) {
        return 'pass';
      } else {
        return arrPatternBeforeDefault$2;
      }
    };
    if (tmpIfTest$4) {
      const tmpCalleeParam$3 = ['fail2'];
      const SSA_objPatternAfterDefault$2 = $(tmpCalleeParam$3);
      const tmpReturnArg$2 = tmpBranchingC$1(SSA_objPatternAfterDefault$2);
      return tmpReturnArg$2;
    } else {
      const tmpReturnArg$9 = tmpBranchingC$1(objPatternBeforeDefault$1);
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpObjLitVal$1 = ['fail3'];
    const tmpCalleeParam$1 = { x: tmpObjLitVal$1 };
    const SSA_bindingPatternObjRoot$1 = $(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(SSA_bindingPatternObjRoot$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$11 = tmpBranchingC(tmpParamBare);
    return tmpReturnArg$11;
  }
};
const tmpCalleeParam$5 = { x: '', a: 11, b: 12 };
const tmpCalleeParam$4 = f(tmpCalleeParam$5);
$(tmpCalleeParam$4);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
