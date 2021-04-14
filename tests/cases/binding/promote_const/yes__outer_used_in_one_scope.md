# Preval test case

# yes__outer_used_in_one_scope.md

> Binding > Promote const > Yes  outer used in one scope
>
> Can we inline hoisted vars

The outer var is only used in a single scope (so we can at least move it inside).

The var is set before any branching, so we can make it lexical there.

The var is only written to once so we can make it a constant.

The var is assigned a literal so we can inline it.

The x should be made a constant.

#TODO

## Input

`````js filename=intro
var x;
function f() {
  $("something");
  x = 100;
  if ($(1)) {
    $(x);
  }
  $(x);
  return x;
}
f();
`````

## Pre Normal

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $('something');
  x = 100;
  if ($(1)) {
    $(x);
  }
  $(x);
  return x;
};
f();
`````

## Normalized

`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  $('something');
  x = 100;
  const tmpIfTest = $(1);
  const tmpBranchingA = function () {
    debugger;
    $(x);
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  };
  const tmpBranchingB = function () {
    debugger;
    const tmpReturnArg$1 = tmpBranchingC();
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function () {
    debugger;
    $(x);
    return x;
  };
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
f();
`````

## Output

`````js filename=intro
$('something');
const tmpIfTest = $(1);
const tmpBranchingC = function () {
  debugger;
  $(100);
  return undefined;
};
if (tmpIfTest) {
  $(100);
  tmpBranchingC();
} else {
  tmpBranchingC();
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'something'
 - 2: 1
 - 3: 100
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
