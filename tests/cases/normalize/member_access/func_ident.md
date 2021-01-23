# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $(global.foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  {
    tmpArg = global.foo;
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  tmpArg = global.foo;
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
