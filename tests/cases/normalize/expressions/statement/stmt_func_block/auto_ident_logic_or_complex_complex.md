# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || $($(2));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let a = { a: 999, b: 1000 };
    $($(0)) || $($(2));
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function (a$1, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$1) {
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$2, tmpCalleeParam$2, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (a$2, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$2) {
    const tmpCallCallee$4 = $;
    const tmpCalleeParam$4 = $(2);
    tmpCallCallee$4(tmpCalleeParam$4);
    const tmpReturnArg$1 = tmpBranchingC(a$2, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3) {
    $(a$3);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$3;
  }
};
const tmpCallCallee$6 = $;
const tmpCalleeParam$6 = f();
tmpCallCallee$6(tmpCalleeParam$6);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(a);
    return undefined;
  } else {
    const tmpCalleeParam$4 = $(2);
    $(tmpCalleeParam$4);
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$6 = f();
$(tmpCalleeParam$6);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
