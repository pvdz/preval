# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(0)) || $($(2));
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $($(0)) || $($(2));
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let tmpCallCallee$3 = $$1;
    let tmpCalleeParam$3 = $$2;
    let tmpIfTest$1 = $$3;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$1, tmpCallCallee$3, tmpCalleeParam$3, tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let tmpCallCallee$5 = $$1;
    let tmpCalleeParam$5 = $$2;
    let tmpIfTest$3 = $$3;
    debugger;
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(2);
    tmpCallCallee$7(tmpCalleeParam$7);
    const tmpReturnArg$1 = tmpBranchingC(a$3, tmpCallCallee$5, tmpCalleeParam$5, tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let tmpCallCallee$9 = $$1;
    let tmpCalleeParam$9 = $$2;
    let tmpIfTest$5 = $$3;
    debugger;
    $(a$5);
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(a, tmpCallCallee, tmpCalleeParam, tmpIfTest);
    return tmpReturnArg$5;
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
  const a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(0);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(a);
    return undefined;
  } else {
    const tmpCalleeParam$7 = $(2);
    $(tmpCalleeParam$7);
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$11 = f();
$(tmpCalleeParam$11);
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
