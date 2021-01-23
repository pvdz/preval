# Preval test case

# return_string.md

> function > return_string
>
> Func decl after return that is used

The DCE should not eliminate the var or the code will break. This one is simple, eh.

Note that technically the code could be optimized because it could realize that g is never initialized, so it becomes undefined, so it can be inlined. There may not be a test case possible for this one. Which may mean vars are almost irrelevant to scan for.

In fact, if a DCE'd var decl means it must be undefined, then inlining is the perfect solution for them.

#TODO

## Input

`````js filename=intro
function f(x) {
  return g;
  var g = $();
}
$(f(1));
`````

## Normalized

`````js filename=intro
function f(x) {
  var g;
  return g;
  g = $();
}
var tmpArg;
('<hoisted var `tmpArg` decl without init>');
tmpArg = f(1);
$(tmpArg);
`````

## Output

`````js filename=intro
var tmpArg;
tmpArg = undefined;
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
