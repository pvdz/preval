# Preval test case

# return_early.md

> Function onecall > Var > Return early
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
const x = f();
$(x);
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
const x = f();
$(x);
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
      let tmpIfTest$2 = $$0;
      debugger;
      const tmpReturnArg$2 = tmpBranchingC(tmpIfTest$2);
      return tmpReturnArg$2;
    };
    const tmpBranchingC = function ($$0) {
      let tmpIfTest$3 = $$0;
      debugger;
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
const x = f();
$(x);
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
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same