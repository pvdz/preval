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
  let a = 1;
  let b = 2;
  let c = 3;
  let tmpReturnArg = undefined;
  const tmpBranchingA = function (a$1, b$1, c$1, tmpReturnArg$1) {
    tmpReturnArg$1 = b$1;
    const tmpReturnArg$4 = tmpBranchingC(a$1, b$1, c$1, tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (a$2, b$2, c$2, tmpReturnArg$2) {
    tmpReturnArg$2 = c$2;
    const tmpReturnArg$5 = tmpBranchingC(a$2, b$2, c$2, tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (a$3, b$3, c$3, tmpReturnArg$3) {
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
