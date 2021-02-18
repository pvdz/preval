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
  let tmpReturnArg = undefined;
  if (a) {
    tmpReturnArg = b;
  } else {
    tmpReturnArg = c;
  }
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  return 2;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
