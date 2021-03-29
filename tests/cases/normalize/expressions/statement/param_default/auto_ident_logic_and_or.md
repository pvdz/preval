# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Param default > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = ($($(1)) && $($(1))) || $($(2))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? ($($(1)) && $($(1))) || $($(2)) : tmpParamBare;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpParamBare$1 = $$0;
    let p$1 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(1);
    p$1 = tmpCallCallee$5(tmpCalleeParam$5);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$7 = $$0;
      let p$7 = $$1;
      let tmpIfTest$7 = $$2;
      let tmpCallCallee$11 = $$3;
      let tmpCalleeParam$11 = $$4;
      debugger;
      const tmpCallCallee$13 = $;
      const tmpCalleeParam$13 = $(1);
      p$7 = tmpCallCallee$13(tmpCalleeParam$13);
      const tmpReturnArg = tmpBranchingC$1(tmpParamBare$7, p$7, tmpIfTest$7, tmpCallCallee$11, tmpCalleeParam$11);
      return tmpReturnArg;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$9 = $$0;
      let p$9 = $$1;
      let tmpIfTest$9 = $$2;
      let tmpCallCallee$15 = $$3;
      let tmpCalleeParam$15 = $$4;
      debugger;
      const tmpReturnArg$1 = tmpBranchingC$1(tmpParamBare$9, p$9, tmpIfTest$9, tmpCallCallee$15, tmpCalleeParam$15);
      return tmpReturnArg$1;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpParamBare$11 = $$0;
      let p$11 = $$1;
      let tmpIfTest$11 = $$2;
      let tmpCallCallee$17 = $$3;
      let tmpCalleeParam$17 = $$4;
      debugger;
      const tmpBranchingA$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpParamBare$13 = $$0;
        let p$13 = $$1;
        let tmpIfTest$13 = $$2;
        let tmpCallCallee$21 = $$3;
        let tmpCalleeParam$21 = $$4;
        debugger;
        const tmpReturnArg$3 = tmpBranchingC$3(tmpParamBare$13, p$13, tmpIfTest$13, tmpCallCallee$21, tmpCalleeParam$21);
        return tmpReturnArg$3;
      };
      const tmpBranchingB$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpParamBare$15 = $$0;
        let p$15 = $$1;
        let tmpIfTest$15 = $$2;
        let tmpCallCallee$23 = $$3;
        let tmpCalleeParam$23 = $$4;
        debugger;
        const tmpCallCallee$25 = $;
        const tmpCalleeParam$25 = $(2);
        p$15 = tmpCallCallee$25(tmpCalleeParam$25);
        const tmpReturnArg$5 = tmpBranchingC$3(tmpParamBare$15, p$15, tmpIfTest$15, tmpCallCallee$23, tmpCalleeParam$23);
        return tmpReturnArg$5;
      };
      const tmpBranchingC$3 = function ($$0, $$1, $$2, $$3, $$4) {
        let tmpParamBare$17 = $$0;
        let p$17 = $$1;
        let tmpIfTest$17 = $$2;
        let tmpCallCallee$27 = $$3;
        let tmpCalleeParam$27 = $$4;
        debugger;
        const tmpReturnArg$7 = tmpBranchingC(tmpParamBare$17, p$17, tmpIfTest$17);
        return tmpReturnArg$7;
      };
      if (p$11) {
        const tmpReturnArg$9 = tmpBranchingA$3(tmpParamBare$11, p$11, tmpIfTest$11, tmpCallCallee$17, tmpCalleeParam$17);
        return tmpReturnArg$9;
      } else {
        const tmpReturnArg$11 = tmpBranchingB$3(tmpParamBare$11, p$11, tmpIfTest$11, tmpCallCallee$17, tmpCalleeParam$17);
        return tmpReturnArg$11;
      }
    };
    if (p$1) {
      const tmpReturnArg$13 = tmpBranchingA$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$13;
    } else {
      const tmpReturnArg$15 = tmpBranchingB$1(tmpParamBare$1, p$1, tmpIfTest$1, tmpCallCallee$5, tmpCalleeParam$5);
      return tmpReturnArg$15;
    }
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpParamBare$3 = $$0;
    let p$3 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    p$3 = tmpParamBare$3;
    const tmpReturnArg$17 = tmpBranchingC(tmpParamBare$3, p$3, tmpIfTest$3);
    return tmpReturnArg$17;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpParamBare$5 = $$0;
    let p$5 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
  };
  if (tmpIfTest) {
    const tmpReturnArg$19 = tmpBranchingA(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$19;
  } else {
    const tmpReturnArg$21 = tmpBranchingB(tmpParamBare, p, tmpIfTest);
    return tmpReturnArg$21;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$29 = $;
const tmpCalleeParam$29 = f();
tmpCallCallee$29(tmpCalleeParam$29);
$(a);
`````

## Output

`````js filename=intro
const tmpBranchingA = function () {
  debugger;
  const tmpCalleeParam$5 = $(1);
  const tmpSSA_p$1 = $(tmpCalleeParam$5);
  if (tmpSSA_p$1) {
    const tmpCalleeParam$13 = $(1);
    const tmpSSA_p$7 = $(tmpCalleeParam$13);
    const tmpReturnArg = tmpBranchingC$1(tmpSSA_p$7);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$15 = tmpBranchingC$1(tmpSSA_p$1);
    return tmpReturnArg$15;
  }
};
const tmpBranchingC$1 = function ($$0) {
  const p$11 = $$0;
  debugger;
  if (p$11) {
    return undefined;
  } else {
    const tmpCalleeParam$25 = $(2);
    $(tmpCalleeParam$25);
    return undefined;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$29 = tmpBranchingA();
$(tmpCalleeParam$29);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
