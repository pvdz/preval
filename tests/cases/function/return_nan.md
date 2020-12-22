# Preval test case

# return_string.md

> function > return_string
>
> A function that returns NaN

## Input

`````js filename=intro
function f() {
  return NaN;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return NaN;
}
$(f());
`````

## Output

`````js filename=intro
$(NaN);
`````
