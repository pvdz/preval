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
    const tmpReturnArg$7 = tmpBranchingC(a$1, b$1, c$1, tmpReturnArg$1);
    return tmpReturnArg$7;
  };
  const tmpBranchingB = function ($$0, $$1, $$2, $$3) {
    let a$3 = $$0;
    let b$3 = $$1;
    let c$3 = $$2;
    let tmpReturnArg$3 = $$3;
    debugger;
    tmpReturnArg$3 = c$3;
    const tmpReturnArg$9 = tmpBranchingC(a$3, b$3, c$3, tmpReturnArg$3);
    return tmpReturnArg$9;
  };
  const tmpBranchingC = function ($$0, $$1, $$2, $$3) {
    let a$5 = $$0;
    let b$5 = $$1;
    let c$5 = $$2;
    let tmpReturnArg$5 = $$3;
    debugger;
    return tmpReturnArg$5;
  };
  if (a) {
    const tmpReturnArg$11 = tmpBranchingA(a, b, c, tmpReturnArg);
    return tmpReturnArg$11;
  } else {
    const tmpReturnArg$13 = tmpBranchingB(a, b, c, tmpReturnArg);
    return tmpReturnArg$13;
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
