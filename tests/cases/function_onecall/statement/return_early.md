# Preval test case

# return_early.md

> Function onecall > Statement > Return early
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      return $('a');
    }
    $('b');
  }
  g();
  $('c');
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let g = function () {
    if ($(1)) {
      return $('a');
    }
    $('b');
  };
  g();
  $('c');
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  let g = function () {
    const tmpIfTest = $(1);
    const tmpBranchingA = function (tmpIfTest$1) {
      const tmpReturnArg$1 = $('a');
      return tmpReturnArg$1;
    };
    const tmpBranchingB = function (tmpIfTest$2) {
      const tmpReturnArg$2 = tmpBranchingC(tmpIfTest$2);
      return tmpReturnArg$2;
    };
    const tmpBranchingC = function (tmpIfTest$3) {
      $('b');
    };
    if (tmpIfTest) {
      const tmpReturnArg$3 = tmpBranchingA(tmpIfTest);
      return tmpReturnArg$3;
    } else {
      const tmpReturnArg$4 = tmpBranchingB(tmpIfTest);
      return tmpReturnArg$4;
    }
  };
  g();
  $('c');
};
f();
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  $('a');
} else {
  $('b');
}
$('c');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
