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
  $('A');
  const tmpIfTest = $(1);
  const tmpBranchingA = function (tmpIfTest$1) {
    $('B');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    $('C');
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
    $('D');
  };
  if (tmpIfTest) {
    const tmpReturnArg$2 = tmpBranchingA(tmpIfTest);
    return tmpReturnArg$2;
  } else {
    const tmpReturnArg$3 = tmpBranchingB(tmpIfTest);
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
