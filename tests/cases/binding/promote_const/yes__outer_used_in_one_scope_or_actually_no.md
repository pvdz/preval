# Preval test case

# yes__outer_used_in_one_scope_or_actually_no.md

> Binding > Promote const > Yes  outer used in one scope or actually no
>
> Can we inline hoisted vars

This shows why x cannot safely be SSA'd here...

This one shadows the other to see what happens when the func doesn't close over x.

#TODO

## Input

`````js filename=intro
var x;
function g() {
  x = $('oops');
}
function f() {
  $("something");
  x = 100;
  if (g(1)) {
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
  if (g(1)) {
    $(x);
  }
  $(x);
  return x;
};
let g = function () {
  debugger;
  x = $('oops');
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
  const tmpIfTest = g(1);
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
let g = function () {
  debugger;
  x = $('oops');
  return undefined;
};
f();
`````

## Output

`````js filename=intro
$('something');
const tmpSSA_x = $('oops');
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'something'
 - 2: 'oops'
 - 3: 'oops'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
