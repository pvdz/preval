# Preval test case

# decl_after.md

> Normalize > Dce > Return > Decl after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
function f() {
  if ($(false)) x = $('fail too');
  return;
  
  let x = $('fail');
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  if ($(false)) x = $('fail too');
  return;
  let x = $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpIfTest = $(false);
  const tmpBranchingA = function (tmpIfTest$1) {
    x = $('fail too');
    const tmpReturnArg = tmpBranchingC(tmpIfTest$1);
    return tmpReturnArg;
  };
  const tmpBranchingB = function (tmpIfTest$2) {
    const tmpReturnArg$1 = tmpBranchingC(tmpIfTest$2);
    return tmpReturnArg$1;
  };
  const tmpBranchingC = function (tmpIfTest$3) {
    return undefined;
    let x$1 = $('fail');
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
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = $('fail too');
    return undefined;
  } else {
    return undefined;
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
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
