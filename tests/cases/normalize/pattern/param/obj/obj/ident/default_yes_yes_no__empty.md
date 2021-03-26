# Preval test case

# default_yes_yes_no__empty.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'fail2' }) }) {
  return 'bad';
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { y = $('fail') } = $({ y: 'fail2' }) } = tmpParamBare;
  return 'bad';
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$1 = $$0;
    let bindingPatternObjRoot$1 = $$1;
    let objPatternBeforeDefault$3 = $$2;
    let objPatternAfterDefault$1 = $$3;
    let tmpIfTest$1 = $$4;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { y: 'fail2' };
    objPatternAfterDefault$1 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg = tmpBranchingC(
      tmpParamBare$1,
      bindingPatternObjRoot$1,
      objPatternBeforeDefault$3,
      objPatternAfterDefault$1,
      tmpIfTest$1,
    );
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$3 = $$0;
    let bindingPatternObjRoot$3 = $$1;
    let objPatternBeforeDefault$5 = $$2;
    let objPatternAfterDefault$3 = $$3;
    let tmpIfTest$3 = $$4;
    debugger;
    objPatternAfterDefault$3 = objPatternBeforeDefault$5;
    const tmpReturnArg$1 = tmpBranchingC(
      tmpParamBare$3,
      bindingPatternObjRoot$3,
      objPatternBeforeDefault$5,
      objPatternAfterDefault$3,
      tmpIfTest$3,
    );
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3, $$4) {
    let tmpParamBare$5 = $$0;
    let bindingPatternObjRoot$5 = $$1;
    let objPatternBeforeDefault$7 = $$2;
    let objPatternAfterDefault$5 = $$3;
    let tmpIfTest$5 = $$4;
    debugger;
    let objPatternBeforeDefault$9 = objPatternAfterDefault$5.y;
    let y$1 = undefined;
    const tmpIfTest$7 = objPatternBeforeDefault$9 === undefined;
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$7 = $$0;
      let bindingPatternObjRoot$7 = $$1;
      let objPatternBeforeDefault$11 = $$2;
      let objPatternAfterDefault$7 = $$3;
      let tmpIfTest$9 = $$4;
      let objPatternBeforeDefault$13 = $$5;
      let y$3 = $$6;
      let tmpIfTest$11 = $$7;
      debugger;
      y$3 = $('fail');
      const tmpReturnArg$3 = tmpBranchingC$1(
        tmpParamBare$7,
        bindingPatternObjRoot$7,
        objPatternBeforeDefault$11,
        objPatternAfterDefault$7,
        tmpIfTest$9,
        objPatternBeforeDefault$13,
        y$3,
        tmpIfTest$11,
      );
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$9 = $$0;
      let bindingPatternObjRoot$9 = $$1;
      let objPatternBeforeDefault$15 = $$2;
      let objPatternAfterDefault$9 = $$3;
      let tmpIfTest$13 = $$4;
      let objPatternBeforeDefault$17 = $$5;
      let y$5 = $$6;
      let tmpIfTest$15 = $$7;
      debugger;
      y$5 = objPatternBeforeDefault$17;
      const tmpReturnArg$5 = tmpBranchingC$1(
        tmpParamBare$9,
        bindingPatternObjRoot$9,
        objPatternBeforeDefault$15,
        objPatternAfterDefault$9,
        tmpIfTest$13,
        objPatternBeforeDefault$17,
        y$5,
        tmpIfTest$15,
      );
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4, $$5, $$6, $$7) {
      let tmpParamBare$11 = $$0;
      let bindingPatternObjRoot$11 = $$1;
      let objPatternBeforeDefault$19 = $$2;
      let objPatternAfterDefault$11 = $$3;
      let tmpIfTest$17 = $$4;
      let objPatternBeforeDefault$21 = $$5;
      let y$7 = $$6;
      let tmpIfTest$19 = $$7;
      debugger;
      return 'bad';
    };
    if (tmpIfTest$7) {
      const tmpReturnArg$7 = tmpBranchingA$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        objPatternBeforeDefault$9,
        y$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(
        tmpParamBare$5,
        bindingPatternObjRoot$5,
        objPatternBeforeDefault$7,
        objPatternAfterDefault$5,
        tmpIfTest$5,
        objPatternBeforeDefault$9,
        y$1,
        tmpIfTest$7,
      );
      return tmpReturnArg$9;
    }
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpParamBare, bindingPatternObjRoot, objPatternBeforeDefault, objPatternAfterDefault, tmpIfTest);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
undefined.x;
throw '[Preval]: Can not reach here';
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
