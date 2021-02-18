# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
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

## Normalized

`````js filename=intro
function f() {
  var y;
  y = undefined;
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    y = tmpChainElementObject;
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let SSA_y = undefined;
  const tmpChainRootProp = $();
  const tmpIfTest = tmpChainRootProp != null;
  if (tmpIfTest) {
    const tmpChainElementObject = tmpChainRootProp.foo;
    SSA_y = tmpChainElementObject;
  }
  const tmpReturnArg = $(SSA_y);
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
