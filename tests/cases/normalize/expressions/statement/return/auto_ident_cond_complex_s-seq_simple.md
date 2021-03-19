# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Return > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $(1) ? (40, 50, 60) : $($(100));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $(1) ? (40, 50, 60) : $($(100));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = undefined;
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpReturnArg$1, tmpIfTest$1) {
    tmpReturnArg$1 = 60;
    const tmpReturnArg$4 = tmpBranchingC(tmpReturnArg$1, tmpIfTest$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpReturnArg$2, tmpIfTest$2) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(100);
    tmpReturnArg$2 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$5 = tmpBranchingC(tmpReturnArg$2, tmpIfTest$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpReturnArg$3, tmpIfTest$3) {
    return tmpReturnArg$3;
  };
  if (tmpIfTest) {
    const tmpReturnArg$6 = tmpBranchingA(tmpReturnArg, tmpIfTest);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpReturnArg, tmpIfTest);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    return 60;
  } else {
    const tmpCalleeParam$1 = $(100);
    const SSA_tmpReturnArg$2 = $(tmpCalleeParam$1);
    return SSA_tmpReturnArg$2;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
