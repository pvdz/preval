# Preval test case

# return_early.md

> Function onecall > Return early
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
  debugger;
  let g = function () {
    debugger;
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
  debugger;
  let g = function () {
    debugger;
    const tmpIfTest = $(1);
    const tmpBranchingA = function ($$0) {
      let tmpIfTest$1 = $$0;
      debugger;
      const tmpReturnArg$1 = $('a');
      return tmpReturnArg$1;
    };
    const tmpBranchingB = function ($$0) {
      let tmpIfTest$3 = $$0;
      debugger;
      const tmpReturnArg$3 = tmpBranchingC(tmpIfTest$3);
      return tmpReturnArg$3;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$5 = $$0;
      debugger;
      $('b');
    };
    if (tmpIfTest) {
      const tmpReturnArg$5 = tmpBranchingA(tmpIfTest);
      return tmpReturnArg$5;
    } else {
      const tmpReturnArg$7 = tmpBranchingB(tmpIfTest);
      return tmpReturnArg$7;
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
