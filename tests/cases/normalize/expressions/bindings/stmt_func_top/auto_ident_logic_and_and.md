# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = $($(1)) && $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = $($(1)) && $($(1)) && $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let a = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let tmpCallCallee$2 = $$0;
    let tmpCalleeParam$2 = $$1;
    let a$1 = $$2;
    debugger;
    const tmpCallCallee$3 = $;
    const tmpCalleeParam$3 = $(1);
    a$1 = tmpCallCallee$3(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(tmpCallCallee$2, tmpCalleeParam$2, a$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let tmpCallCallee$4 = $$0;
    let tmpCalleeParam$4 = $$1;
    let a$2 = $$2;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpCallCallee$4, tmpCalleeParam$4, a$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let tmpCallCallee$5 = $$0;
    let tmpCalleeParam$5 = $$1;
    let a$3 = $$2;
    debugger;
    const tmpBranchingA$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$7 = $$0;
      let tmpCalleeParam$7 = $$1;
      let a$4 = $$2;
      debugger;
      const tmpCallCallee$8 = $;
      const tmpCalleeParam$8 = $(2);
      a$4 = tmpCallCallee$8(tmpCalleeParam$8);
      const tmpReturnArg$2 = tmpBranchingC$1(tmpCallCallee$7, tmpCalleeParam$7, a$4);
      return tmpReturnArg$2;
    };
    const tmpBranchingB$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$9 = $$0;
      let tmpCalleeParam$9 = $$1;
      let a$5 = $$2;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC$1(tmpCallCallee$9, tmpCalleeParam$9, a$5);
      return tmpReturnArg$3;
    };
    const tmpBranchingC$1 = function ($$0, $$1, $$2) {
      let tmpCallCallee$10 = $$0;
      let tmpCalleeParam$10 = $$1;
      let a$6 = $$2;
      debugger;
      $(a$6);
    };
    if (a$3) {
      const tmpReturnArg$4 = tmpBranchingA$1(tmpCallCallee$5, tmpCalleeParam$5, a$3);
      return tmpReturnArg$4;
    } else {
      const tmpReturnArg$5 = tmpBranchingB$1(tmpCallCallee$5, tmpCalleeParam$5, a$3);
      return tmpReturnArg$5;
    }
  };
  if (a) {
    const tmpReturnArg$6 = tmpBranchingA(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpCallCallee, tmpCalleeParam, a);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee$11 = $;
const tmpCalleeParam$11 = f();
tmpCallCallee$11(tmpCalleeParam$11);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  const a = $(tmpCalleeParam);
  const tmpBranchingC = function ($$0) {
    const a$3 = $$0;
    debugger;
    if (a$3) {
      const tmpCalleeParam$8 = $(2);
      const SSA_a$4 = $(tmpCalleeParam$8);
      $(SSA_a$4);
      return undefined;
    } else {
      $(a$3);
      return undefined;
    }
  };
  if (a) {
    const tmpCalleeParam$3 = $(1);
    const SSA_a$1 = $(tmpCalleeParam$3);
    const tmpReturnArg = tmpBranchingC(SSA_a$1);
    return tmpReturnArg;
  } else {
    const tmpReturnArg$7 = tmpBranchingC(a);
    return tmpReturnArg$7;
  }
};
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
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
