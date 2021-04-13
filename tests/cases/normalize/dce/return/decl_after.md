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
  debugger;
  if ($(false)) x = $('fail too');
  return;
  let x = $('fail');
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(false);
  const tmpBranchingA = function () {
    debugger;
    x = $('fail too');
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
    return undefined;
  };
  let x = undefined;
  if (tmpIfTest) {
    const tmpReturnArg$3 = tmpBranchingA();
    return tmpReturnArg$3;
  } else {
    const tmpReturnArg$5 = tmpBranchingB();
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpIfTest = $(false);
if (tmpIfTest) {
  $('fail too');
} else {
}
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
