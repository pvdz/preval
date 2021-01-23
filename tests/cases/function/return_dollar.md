# Preval test case

# return_string.md

> function > return_string
>
> Function that returns a special dollar func call

Trying to test a function that is "pure" (no observable side effects) but is not easy to inline. Using the dollar hack since in test cases we assume this is an observable side effect that can't be reduced.

I'm happy to reach a point where it can inline the function properly though :D

(To be fair this is probably a case that's fairly easy to inline anyways, in the grand scheme of things)

#TODO

## Input

`````js filename=intro
function f() {
  return $();
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let tmpReturnArg = $();
    return tmpReturnArg;
  }
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f();
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg = $();
  return tmpReturnArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: 
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
