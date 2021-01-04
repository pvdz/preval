# Preval test case

# return_sequence_prop.md

> normalize > sequence > return_sequence_prop
>
> Returning a member express on a sequence

#TODO

## Input

`````js filename=intro
function f() {
  return ($(1), $(2)).foo
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpComplexMemberObj;
  $(1);
  tmpComplexMemberObj = $(2);
  return tmpComplexMemberObj.foo;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var tmpComplexMemberObj;
  $(1);
  tmpComplexMemberObj = $(2);
  return tmpComplexMemberObj.foo;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
