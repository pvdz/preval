# Preval test case

# if_return_return.md

> Function onecall > Assign > If return return
>
> Return inlining

#TODO

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  if ($()) {
    $(1);
  }
  $(2);
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````

## Pre Normal

`````js filename=intro
let closure = function () {
  return x;
};
let f = function () {
  if ($()) {
    $(1);
  }
  $(2);
};
let x = $(100);
$(closure());
x = f();
$(x);
$(closure());
`````

## Normalized

`````js filename=intro
let closure = function () {
  return x;
};
let f = function () {
  const tmpIfTest = $();
  const tmpBranchingA = function (tmpIfTest$1) {
    $(1);
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
    $(2);
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpIfTest);
    return tmpReturnArg$3;
  }
};
let x = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = closure();
tmpCallCallee(tmpCalleeParam);
x = f();
$(x);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = closure();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
let x = $(100);
const tmpCalleeParam = x;
$(tmpCalleeParam);
const tmpIfTest = $();
if (tmpIfTest) {
  $(1);
  $(2);
  x = undefined;
} else {
  $(2);
  x = undefined;
}
$(x);
const tmpCalleeParam$1 = x;
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 2
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
