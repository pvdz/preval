# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Bindings > Stmt func block > Auto ident cond complex c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = $(1) ? (40, 50, $(60)) : $($(100));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = $(1) ? (40, 50, $(60)) : $($(100));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0, $$1) {
    let a$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    a$1 = $(60);
    const tmpReturnArg = tmpBranchingC(a$1, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let a$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    a$3 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$1 = tmpBranchingC(a$3, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let a$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(a, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(a, tmpIfTest);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpSSA_a$1 = $(60);
    $(tmpSSA_a$1);
    return undefined;
  } else {
    const tmpCalleeParam$1 = $(100);
    const tmpSSA_a$3 = $(tmpCalleeParam$1);
    $(tmpSSA_a$3);
    return undefined;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: 60
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
