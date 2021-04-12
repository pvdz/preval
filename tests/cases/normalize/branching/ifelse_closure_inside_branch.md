# Preval test case

# ifelse_closure_inside_branch.md

> Normalize > Branching > Ifelse closure inside branch
>
> If a branch contains a function that closes over an outside binding in the tail then that should keep working... 

#TODO

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      // This is a closure but after if-else normalization this if-branch becomes its own function without access to it
      $(xyz);
    };
    $(g);
  }
  const xyz = $();
  $(1);
};
$(f());
`````

## Pre Normal

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      $(xyz);
    };
    $(g);
  }
  const xyz = $();
  $(1);
};
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  const tmpBranchingA = function () {
    debugger;
    const g$1 = function () {
      debugger;
      $(xyz);
    };
    $(g$1);
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
    $(1);
  };
  let xyz = undefined;
  if ($) {
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
const f = function () {
  debugger;
  const g$1 = function () {
    debugger;
    $(xyz);
  };
  const tmpBranchingC = function () {
    debugger;
    xyz = $();
    $(1);
  };
  let xyz = undefined;
  if ($) {
    $(g$1);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
