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
  1;
  2;
  const tmpBindingInit = $();
  const y = tmpBindingInit.foo;
  {
    let tmpStmtArg = $(y);
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
  const tmpBindingInit = $();
  const y = tmpBindingInit.foo;
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: <crash[ Cannot read property 'foo' of undefined ]>

Normalized calls: Same

Final output calls: Same
