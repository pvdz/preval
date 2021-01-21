# Preval test case

# return_string.md

> function > return_string
>
> A function that returns Infinity

## Input

`````js filename=intro
function f() {
  return Infinity;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return Infinity;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = Infinity;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
