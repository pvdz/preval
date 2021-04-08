# Preval test case

# lex_func.md

> Normalize > Naming > Lex func
>
> First a block binding shadowing a later outer binding in a function

## Input

`````js filename=intro
function f() {
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  let a = $(1);
  $(a);
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a$1 = $(1);
    $(a$1);
    if ($()) return a$1;
  }
  let a = $(1);
  $(a);
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  const tmpBranchingA = function () {
    debugger;
    return a$1;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingC = function () {
    debugger;
    a = $(1);
    $(a);
    return a;
  };
  let a = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$1 = tmpBranchingA();
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$3 = tmpBranchingB();
    return tmpReturnArg$3;
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
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    const tmpSSA_a = $(1);
    $(tmpSSA_a);
    return tmpSSA_a;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
