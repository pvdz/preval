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
  y = (1, 2, $()).foo;
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObj;
  var y;
  1;
  2;
  tmpObj = $();
  y = tmpObj.foo;
  return $(y);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var tmpObj;
  var y;
  tmpObj = $();
  y = tmpObj.foo;
  return $(y);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````