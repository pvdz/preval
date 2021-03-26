# Preval test case

# if-else-then.md

> Ifelse > If-else-then
>
> This should be abstracted

#TODO

## Input

`````js filename=intro
function f() {
  $('A');
  if ($(1)) {
    $('B');
  } else {
    $('C');
  }
  $('D');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $('A');
  if ($(1)) {
    $('B');
  } else {
    $('C');
  }
  $('D');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $('A');
  const tmpIfTest = $(1);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    $('B');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    $('C');
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    $('D');
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB(tmpIfTest);
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
  $('A');
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $('B');
    $('D');
    return undefined;
  } else {
    $('C');
    $('D');
    return undefined;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'A'
 - 2: 1
 - 3: 'B'
 - 4: 'D'
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
