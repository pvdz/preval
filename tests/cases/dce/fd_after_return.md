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
  function g() {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  const tmpReturnArg = g();
  return tmpReturnArg;
  ('<hoisted func decl `g`>');
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {
  function g() {
    const tmpReturnArg$1 = $();
    return tmpReturnArg$1;
  }
  const tmpReturnArg = g();
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
