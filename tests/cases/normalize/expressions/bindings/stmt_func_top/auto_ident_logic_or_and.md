# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic or and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(0)) || ($($(1)) && $($(2)));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = $($(0)) || ($($(1)) && $($(2)));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let a$1 = $$2;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$5, tmpCalleeParam$5, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$7 = $$0;
    let tmpCalleeParam$7 = $$1;
    let a$3 = $$2;
    debugger;
    const tmpCallCallee$9 = $;
    const tmpCalleeParam$9 = $(1);
    a$3 = tmpCallCallee$9(tmpCalleeParam$9);
    const tmpBranchingA$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$15 = $$0;
      let tmpCalleeParam$15 = $$1;
      let a$7 = $$2;
      let tmpCallCallee$17 = $$3;
      let tmpCalleeParam$17 = $$4;
      debugger;
      const tmpCallCallee$19 = $;
      const tmpCalleeParam$19 = $(2);
      a$7 = tmpCallCallee$19(tmpCalleeParam$19);
      const tmpReturnArg$1 = tmpBranchingC$1(tmpCallCallee$15, tmpCalleeParam$15, a$7, tmpCallCallee$17, tmpCalleeParam$17);
      return tmpReturnArg$1;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$21 = $$0;
      let tmpCalleeParam$21 = $$1;
      let a$9 = $$2;
      let tmpCallCallee$23 = $$3;
      let tmpCalleeParam$23 = $$4;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpCallCallee$21, tmpCalleeParam$21, a$9, tmpCallCallee$23, tmpCalleeParam$23);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2, $$3, $$4) {
      let tmpCallCallee$25 = $$0;
      let tmpCalleeParam$25 = $$1;
      let a$11 = $$2;
      let tmpCallCallee$27 = $$3;
      let tmpCalleeParam$27 = $$4;
      debugger;
      const tmpReturnArg$5 = tmpBranchingC(tmpCallCallee$25, tmpCalleeParam$25, a$11);
      return tmpReturnArg$5;
    };
    if (a$3) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpCallCallee$7, tmpCalleeParam$7, a$3, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpCallCallee$7, tmpCalleeParam$7, a$3, tmpCallCallee$9, tmpCalleeParam$9);
      return tmpReturnArg$9;
    }
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$13 = $$0;
    let tmpCalleeParam$13 = $$1;
    let a$5 = $$2;
    debugger;
    $(a$5);
  };
  if (a) {
    const tmpReturnArg$11 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$29 = $;
const tmpCalleeParam$29 = f();
tmpCallCallee$29(tmpCalleeParam$29);
`````

## Output

`````js filename=intro
const tmpBranchingB = function () {
  debugger;
  const tmpCalleeParam$9 = $(1);
  const tmpSSA_a$3 = $(tmpCalleeParam$9);
  if (tmpSSA_a$3) {
    const tmpCalleeParam$19 = $(2);
    const tmpSSA_a$7 = $(tmpCalleeParam$19);
    $(tmpSSA_a$7);
    return undefined;
  } else {
    $(tmpSSA_a$3);
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const a = $(tmpCalleeParam);
  if (a) {
    $(a);
    return undefined;
  } else {
    const tmpReturnArg$13 = tmpBranchingB();
    return tmpReturnArg$13;
  }
};
const tmpCalleeParam$29 = f();
$(tmpCalleeParam$29);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
