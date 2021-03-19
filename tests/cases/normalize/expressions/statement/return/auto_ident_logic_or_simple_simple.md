# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Return > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return 0 || 2;
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return 0 || 2;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  let tmpReturnArg = 0;
  const tmpBranchingA = function (tmpReturnArg$1) {
    const tmpReturnArg$4 = tmpBranchingC(tmpReturnArg$1);
    return tmpReturnArg$4;
  };
  const tmpBranchingB = function (tmpReturnArg$2) {
    tmpReturnArg$2 = 2;
    const tmpReturnArg$5 = tmpBranchingC(tmpReturnArg$2);
    return tmpReturnArg$5;
  };
  const tmpBranchingC = function (tmpReturnArg$3) {
    return tmpReturnArg$3;
  };
  if (tmpReturnArg) {
    const tmpReturnArg$6 = tmpBranchingA(tmpReturnArg);
    return tmpReturnArg$6;
  } else {
    const tmpReturnArg$7 = tmpBranchingB(tmpReturnArg);
    return tmpReturnArg$7;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
