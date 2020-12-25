# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $()).foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpObj;
  1;
  2;
  tmpObj = $();
  const y = tmpObj.foo;
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
  tmpObj = $();
  const y = tmpObj.foo;
  return $(y);
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````