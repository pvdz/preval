# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident logic || simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = 0 || $($(1)));
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = 0 || $($(1)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = 0;
  const tmpBranchingA = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
    const tmpReturnArg$3 = tmpBranchingC();
    return tmpReturnArg$3;
  };
  const tmpBranchingC = function () {
    debugger;
    tmpReturnArg = a;
    return tmpReturnArg;
  };
  let tmpReturnArg = undefined;
  if (a) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
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
const tmpCalleeParam$1 = $(1);
const tmpSSA_a$1 = $(tmpCalleeParam$1);
$(tmpSSA_a$1);
$(tmpSSA_a$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
