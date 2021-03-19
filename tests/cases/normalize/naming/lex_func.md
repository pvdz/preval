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
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  const tmpBranchingA = function (a$2, tmpIfTest$1) {
    return a$2;
  };
  const tmpBranchingB = function (a$3, tmpIfTest$2) {
    const tmpReturnArg = tmpBranchingC(a$3, tmpIfTest$2);
    return tmpReturnArg;
  };
  const tmpBranchingC = function (a$4, tmpIfTest$3) {
    let a$5 = $(1);
    $(a$5);
    return a$5;
  };
  if (tmpIfTest) {
    const tmpReturnArg$1 = tmpBranchingA(a$1, tmpIfTest);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$2 = tmpBranchingB(a$1, tmpIfTest);
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
  const a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  if (tmpIfTest) {
    return a$1;
  } else {
    const a$5 = $(1);
    $(a$5);
    return a$5;
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
