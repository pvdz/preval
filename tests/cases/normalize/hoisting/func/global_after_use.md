# Preval test case

# global_after_use.md

> normalize > hoisting > func > global_after_use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

#TODO

## Input

`````js filename=intro
$(f(1));
function f() { return $(2); }
`````

## Normalized

`````js filename=intro
function f() {
  {
    let tmpStmtArg = $(2);
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f(1);
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  let tmpStmtArg = $(2);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f(1);
$(tmpArg);
`````

## Result

Should call `$` with:
[[2], [null], null];

Normalized calls: Same

Final output calls: Same
