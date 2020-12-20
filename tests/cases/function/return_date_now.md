# Preval test case

# return_string.md

> function > return_string
>
> A function that returns Date.now()

The function is assumed to be pure (no observable side effects) but still not inlinable, although Date.now() is probably insufficient to stop this.

#TODO

## Input

`````js filename=intro
function f() {
  return Date.now();
}
$(f());
`````

## Output

`````js filename=intro
function f() {
  return Date.now();
}
$(f());
`````