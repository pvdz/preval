# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Return > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return 0 || $($(1));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return 0 || $($(1));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let tmpReturnArg = 0;
  const tmpBranchingA = function ($$0) {
    let tmpReturnArg$1 = $$0;
    debugger;
    const tmpReturnArg$7 = tmpBranchingC(tmpReturnArg$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0) {
    let tmpReturnArg$3 = $$0;
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg$3 = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$9 = tmpBranchingC(tmpReturnArg$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0) {
    let tmpReturnArg$5 = $$0;
    debugger;
    return tmpReturnArg$5;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$11 = tmpBranchingA(tmpReturnArg);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(tmpReturnArg);
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
const a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = $(1);
const SSA_tmpReturnArg$3 = $(tmpCalleeParam$1);
$(SSA_tmpReturnArg$3);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
