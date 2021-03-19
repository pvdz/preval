# Preval test case

# func_lex.md

> Normalize > Naming > Func lex
>
> First an outer binding shadowed by block binding in a function

## Input

`````js filename=intro
function f() {
  let a = $(1);
  $(a);
  {
    let a = $(1);
    $(a);
    if ($()) return a; 
  }
  return a;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = $(1);
  $(a);
  {
    let a$1 = $(1);
    $(a$1);
    if ($()) return a$1;
  }
  return a;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = $(1);
  $(a);
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  const tmpBranchingA = function (a$2, a$3, tmpIfTest$1) {
    return a$3;
  };
  const tmpBranchingB = function (a$4, a$5, tmpIfTest$2) {
    const tmpReturnArg = tmpBranchingC(a$4, a$5, tmpIfTest$2);
    return tmpReturnArg;
  };
  const tmpBranchingC = function (a$6, a$7, tmpIfTest$3) {
    return a$6;
  };
  if (tmpIfTest) {
    const tmpReturnArg$1 = tmpBranchingA(a, a$1, tmpIfTest);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$2 = tmpBranchingB(a, a$1, tmpIfTest);
    return tmpReturnArg$2;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const a = $(1);
  $(a);
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    return a;
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
 - 3: 1
 - 4: 1
 - 5: 
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
