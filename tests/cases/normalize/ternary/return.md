# Preval test case

# return.md

> Normalize > Ternary > Return
>
> Example of rewriting a return statement with ternary

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1, b = 2, c = 3;
  return a ? b : c;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = 1,
    b = 2,
    c = 3;
  return a ? b : c;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = 1;
  let b = 2;
  let c = 3;
  let tmpReturnArg = undefined;
  const tmpBranchingA = function ($$0, $$1, $$2, $$3) {
    let a$1 = $$0;
    let b$1 = $$1;
    let c$1 = $$2;
    let tmpReturnArg$1 = $$3;
    debugger;
    tmpReturnArg$1 = b$1;
    const tmpReturnArg$4 = tmpBranchingC(a$1, b$1, c$1, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$2 = $$0;
    let b$2 = $$1;
    let c$2 = $$2;
    let tmpReturnArg$2 = $$3;
    debugger;
    tmpReturnArg$2 = c$2;
    const tmpReturnArg$5 = tmpBranchingC(a$2, b$2, c$2, tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let b$3 = $$1;
    let c$3 = $$2;
    let tmpReturnArg$3 = $$3;
    debugger;
    return tmpReturnArg$3;
  };
  if (a) {
    const tmpReturnArg$6 = tmpBranchingA(a, b, c, tmpReturnArg);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(a, b, c, tmpReturnArg);
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
