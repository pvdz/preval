# Preval test case

# decl_after.md

> Normalize > Dce > Throw > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(false)) x = $('fail too');
  throw 'exit';
  
  let x = $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(false)) x = $('fail too');
  throw 'exit';
  let x = $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(false);
  const tmpBranchingA = function ($$0) {
    let tmpIfTest$1 = $$0;
    debugger;
    x = $('fail too');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function ($$0) {
    let tmpIfTest$3 = $$0;
    debugger;
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$3);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function ($$0) {
    let tmpIfTest$5 = $$0;
    debugger;
    throw 'exit';
    let x$1 = $('fail');
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
  const tmpIfTest = $(false);
  const tmpBranchingC = function () {
    debugger;
    throw 'exit';
  };
  if (tmpIfTest) {
    x = $('fail too');
    const tmpReturnArg = tmpBranchingC();
    return tmpReturnArg;
  } else {
    const tmpReturnArg$5 = tmpBranchingC();
    return tmpReturnArg$5;
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: false
 - eval returned: ('<crash[ exit ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
