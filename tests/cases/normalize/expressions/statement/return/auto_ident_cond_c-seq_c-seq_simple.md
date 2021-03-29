# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = undefined;
  const tmpIfTest = $(30);
  const tmpBranchingA = function ($$0, $$1) {
    let tmpReturnArg$1 = $$0;
    let tmpIfTest$1 = $$1;
    debugger;
    tmpReturnArg$1 = $(60);
    const tmpReturnArg$7 = tmpBranchingC(tmpReturnArg$1, tmpIfTest$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1) {
    let tmpReturnArg$3 = $$0;
    let tmpIfTest$3 = $$1;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    tmpReturnArg$3 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$3, tmpIfTest$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1) {
    let tmpReturnArg$5 = $$0;
    let tmpIfTest$5 = $$1;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$11 = tmpBranchingA(tmpReturnArg, tmpIfTest);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpReturnArg, tmpIfTest);
    return tmpReturnArg$13;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$3(tmpCalleeParam$3);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    const tmpReturnArg$11 = $(60);
    return tmpReturnArg$11;
  } else {
    const tmpCalleeParam$1 = $(100);
    const tmpSSA_tmpReturnArg$3 = $(tmpCalleeParam$1);
    return tmpSSA_tmpReturnArg$3;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
