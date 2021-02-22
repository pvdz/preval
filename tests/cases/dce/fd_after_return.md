# Preval test case

# fd_after_return.md

> Dce > Fd after return
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
    const tmpReturnArg = $();
    return tmpReturnArg;
  }
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {
  function g() {
    const tmpReturnArg = $();
    return tmpReturnArg;
  }
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
}
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
