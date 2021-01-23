# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15).foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpMemberComplexObj;
  {
    tmpMemberComplexObj = parseInt(15);
    tmpArg = tmpMemberComplexObj.foo;
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpMemberComplexObj;
  tmpMemberComplexObj = parseInt(15);
  tmpArg = tmpMemberComplexObj.foo;
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
