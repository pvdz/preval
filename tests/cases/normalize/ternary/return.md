# Preval test case

# var.md

> normalize > ternary > var
>
> Example of rewriting a return statement with ternary

#TODO

## Input

`````js filename=intro
function f() {
  let a = 1, b = 2, c = 3;
  return a ? b : c;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = 1;
  let b = 2;
  let c = 3;
  if (a) {
    return b;
  } else {
    return c;
  }
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 2;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: undefined

Normalized calls: Same

Final output calls: Same
