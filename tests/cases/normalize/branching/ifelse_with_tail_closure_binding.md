# Preval test case

# ifelse_with_tail_closure_binding.md

> Normalize > Branching > Ifelse with tail closure binding
>
> Regression found while running Preval on Tenko

The problem is that if-else normalization would slice the tail into its own function. But if the tail contained a var decl that was also used in a closure (defined before the if) then the binding would not be accessible anymore, leading to a global variable. 

#TODO

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz);
  };
  if ($) {
    $(1);
  }
  const xyz = $();
  return g();
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz);
  };
  if ($) {
    $(1);
  }
  const xyz = $();
  return g();
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz);
    return undefined;
  };
  const tmpBranchingA = function () {
    debugger;
    $(1);
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
    xyz = $();
    const tmpReturnArg$3 = g();
    return tmpReturnArg$3;
  };
  let xyz = undefined;
  if ($) {
    const tmpReturnArg$5 = tmpBranchingA();
    return tmpReturnArg$5;
  } else {
    const tmpReturnArg$7 = tmpBranchingB();
    return tmpReturnArg$7;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpBranchingC = function () {
  debugger;
  xyz = $();
  $(xyz);
  return undefined;
};
let xyz = undefined;
if ($) {
  $(1);
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
 - 2: 
 - 3: undefined
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
