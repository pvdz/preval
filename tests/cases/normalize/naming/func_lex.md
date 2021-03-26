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
  debugger;
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
  debugger;
  let a = $(1);
  $(a);
  let a$1 = $(1);
  $(a$1);
  const tmpIfTest = $();
  const tmpBranchingA = function ($$0, $$1, $$2) {
    let a$2 = $$0;
    let a$4 = $$1;
    let tmpIfTest$1 = $$2;
    debugger;
    return a$4;
  };
  const tmpBranchingB = function ($$0, $$1, $$2) {
    let a$6 = $$0;
    let a$8 = $$1;
    let tmpIfTest$3 = $$2;
    debugger;
    const tmpReturnArg = tmpBranchingC(a$6, a$8, tmpIfTest$3);
    return tmpReturnArg;
  };
  const tmpBranchingC = function ($$0, $$1, $$2) {
    let a$10 = $$0;
    let a$12 = $$1;
    let tmpIfTest$5 = $$2;
    debugger;
    return a$10;
  };
  if (tmpIfTest) {
    const tmpReturnArg$1 = tmpBranchingA(a, a$1, tmpIfTest);
    return tmpReturnArg$1;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(a, a$1, tmpIfTest);
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
