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
  const tmpReturnArg = g();
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {
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

Normalized calls: BAD?!
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')
