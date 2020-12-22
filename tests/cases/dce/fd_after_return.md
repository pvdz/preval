# Preval test case

# return_string.md

> function > return_string
>
> Func decl after return that is used

The DCE should not eliminate the function or the code will break. This one is simple, eh.

#TODO

## Input

`````js filename=intro
function f(x) {
  return g();
  function g() {
    return $()  
  }
}
$(f(1));
`````

## Normalized

`````js filename=intro
function f(x) {
  return g();
  function g() {
    return $();
  }
}
$(f(1));
`````

## Output

`````js filename=intro
function f(x) {
  return g();
  function g() {
    return $();
  }
}
$(f(1));
`````
