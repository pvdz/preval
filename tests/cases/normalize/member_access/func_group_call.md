# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $(parseInt))()
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpNewObj;
  1;
  2;
  tmpNewObj = $(parseInt);
  const y = tmpNewObj();
  {
    let tmpReturnArg = $(y);
    return tmpReturnArg;
  }
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  var tmpNewObj;
  tmpNewObj = $(parseInt);
  const y = tmpNewObj();
  let tmpReturnArg = $(y);
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: null
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
