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
  var tmpComplexMemberObj;
  var y;
  1;
  2;
  tmpComplexMemberObj = $();
  y = tmpComplexMemberObj.foo;
  {
    let tmpStmtArg = $(y);
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  var x;
  var x;
  8;
  8;
  x = x();
  x = x.x;
  {
    var x = x(x);
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  var tmpComplexMemberObj;
  var y;
  tmpComplexMemberObj = $();
  y = tmpComplexMemberObj.foo;
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
