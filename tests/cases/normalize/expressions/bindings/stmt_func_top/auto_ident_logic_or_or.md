# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic or or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(0)) || $($(1)) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = $($(0)) || $($(1)) || $($(2));
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
    let tmpCallCallee$3 = $$0;
    let tmpCalleeParam$3 = $$1;
    let a$1 = $$2;
    debugger;
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$3, tmpCalleeParam$3, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let a$3 = $$2;
    debugger;
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(1);
    a$3 = tmpCallCallee$7(tmpCalleeParam$7);
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$5, tmpCalleeParam$5, a$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$9 = $$0;
    let tmpCalleeParam$9 = $$1;
    let a$5 = $$2;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$13 = $$0;
      let tmpCalleeParam$13 = $$1;
      let a$7 = $$2;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpCallCallee$13, tmpCalleeParam$13, a$7);
      return tmpReturnArg$3;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$15 = $$0;
      let tmpCalleeParam$15 = $$1;
      let a$9 = $$2;
      debugger;
      const tmpCallCallee$17 = $;
      const tmpCalleeParam$17 = $(2);
      a$9 = tmpCallCallee$17(tmpCalleeParam$17);
      const tmpReturnArg$5 = tmpBranchingC$1(tmpCallCallee$15, tmpCalleeParam$15, a$9);
      return tmpReturnArg$5;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$19 = $$0;
      let tmpCalleeParam$19 = $$1;
      let a$11 = $$2;
      debugger;
      $(a$11);
    };
    if (a$5) {
      const tmpReturnArg$7 = tmpBranchingA$1(tmpCallCallee$9, tmpCalleeParam$9, a$5);
      return tmpReturnArg$7;
    } else {
      const tmpReturnArg$9 = tmpBranchingB$1(tmpCallCallee$9, tmpCalleeParam$9, a$5);
      return tmpReturnArg$9;
    }
  };
  if (a) {
    const tmpReturnArg$11 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$13;
  }
};
const tmpCallCallee$21 = $;
const tmpCalleeParam$21 = f();
tmpCallCallee$21(tmpCalleeParam$21);
`````

## Output

`````js filename=intro
const tmpBranchingC = function ($$0) {
  const a$5 = $$0;
  debugger;
  if (a$5) {
    $(a$5);
    return undefined;
  } else {
    const tmpCalleeParam$17 = $(2);
    const tmpSSA_a$9 = $(tmpCalleeParam$17);
    $(tmpSSA_a$9);
    return undefined;
  }
};
const f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  const a = $(tmpCalleeParam);
  if (a) {
    const tmpReturnArg$11 = tmpBranchingC(a);
    return tmpReturnArg$11;
  } else {
    const tmpCalleeParam$7 = $(1);
    const tmpSSA_a$3 = $(tmpCalleeParam$7);
    const tmpReturnArg$1 = tmpBranchingC(tmpSSA_a$3);
    return tmpReturnArg$1;
  }
};
const tmpCalleeParam$21 = f();
$(tmpCalleeParam$21);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
