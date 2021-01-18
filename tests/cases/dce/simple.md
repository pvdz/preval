# Preval test case

# simple.md

> dce > simple
>
> Simple case of dead code elimination

## Input

`````js filename=intro
function f() {
  return 1;
  return 2;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return 1;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = 1;
$(tmpArg);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
