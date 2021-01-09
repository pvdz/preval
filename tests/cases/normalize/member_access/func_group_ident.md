# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a).x
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const a = { x: 1 };
  1;
  const y = a.x;
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
  var x = { x: 8 };
  8;
  var x = x.x;
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
  const a = { x: 1 };
  const y = a.x;
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
