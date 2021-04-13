# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = { a: 999, b: 1000 };
  a = (1, 2, b)?.x;
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = (1, 2, b)?.x;
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = { a: 999, b: 1000 };
  a = undefined;
  const tmpChainRootProp = b;
  const tmpIfTest = tmpChainRootProp != null;
  const tmpBranchingA = function () {
    debugger;
    const tmpChainElementObject$1 = tmpChainRootProp.x;
    a = tmpChainElementObject$1;
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
  if (tmpIfTest) {
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
const b = { x: 1 };
let tmpSSA_a = undefined;
const tmpIfTest = b != null;
const tmpBranchingC = function () {
  debugger;
  $(tmpSSA_a);
  return undefined;
};
if (tmpIfTest) {
  const tmpChainElementObject$1 = b.x;
  tmpSSA_a = tmpChainElementObject$1;
  tmpBranchingC();
} else {
  tmpBranchingC();
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
