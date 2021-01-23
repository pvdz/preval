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
    {
      let tmpReturnArg_1 = $();
      return tmpReturnArg_1;
    }
  }
  {
    let tmpReturnArg = g();
    return tmpReturnArg;
  }
}
var tmpArg;
tmpArg = f(1);
$(tmpArg);
`````

## Output

`````js filename=intro
function f(x) {
  function g() {
    let tmpReturnArg_1 = $();
    return tmpReturnArg_1;
  }
  let tmpReturnArg = g();
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f(1);
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
