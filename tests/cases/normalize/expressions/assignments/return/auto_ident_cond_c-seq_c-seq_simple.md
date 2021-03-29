# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident cond c-seq c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(30);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    a = $(60);
    const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg$3;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$5 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    let tmpReturnArg$1 = a;
    return tmpReturnArg$1;
  };
  if (tmpIfTest) {
    const tmpReturnArg$7 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$7;
  } else {
    const tmpReturnArg$9 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$9;
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
const tmpBranchingC = function () {
  debugger;
  const tmpReturnArg$1 = a;
  return tmpReturnArg$1;
};
const f = function () {
  debugger;
  const tmpIfTest = $(30);
  if (tmpIfTest) {
    a = $(60);
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  } else {
    const tmpCalleeParam$1 = $(100);
    a = $(tmpCalleeParam$1);
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
let a = { a: 999, b: 1000 };
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
 - 4: 60
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
