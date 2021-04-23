# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident logic and simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1 && 2;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let a = 1 && 2;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = 1;
  const tmpBranchingA = function () {
    debugger;
    a = 2;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    $(a);
    return undefined;
  };
  if (a) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
