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
  $(1);
  {
    let tmpBindingInit = $(2);
    let tmpStmtArg = tmpBindingInit.foo;
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  let tmpBindingInit = $(2);
  let tmpStmtArg = tmpBindingInit.foo;
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: <crash[ Cannot read property 'foo' of undefined ]>

Normalized calls: Same

Final output calls: Same
