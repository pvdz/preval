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
$(f());
`````

## Output

`````js filename=intro
$(1);
`````
