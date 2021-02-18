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
  y = (1, 2, $())??foo;
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var y;
  y = $();
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = foo;
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
  var y;
  let SSA_y = $();
  const tmpIfTest = SSA_y == null;
  if (tmpIfTest) {
    SSA_y = foo;
  }
  const tmpReturnArg = $(SSA_y);
  return tmpReturnArg;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - 1: 
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
