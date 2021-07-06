# Preval test case

# func_assign_member.md

> Normalize > Optional > Func assign member
>
> Assignment of a member expression where the object is a sequence

This could appear and is most likely a transformation artifact.

## Input

`````js filename=intro
function f() {
  var y;
  y = (1, 2, $())?.foo;
  return $(y);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = (1, 2, $())?.foo;
  return $(y);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let y = undefined;
  y = undefined;
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    y = tmpChainElementObject;
  } else {
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpChainRootProp = $();
const tmpIfTest = tmpChainRootProp == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpReturnArg = $(undefined);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpChainElementObject = tmpChainRootProp.foo;
  const tmpClusterSSA_tmpReturnArg$1 = $(tmpChainElementObject);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
