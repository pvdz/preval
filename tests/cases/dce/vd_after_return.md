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

## Output

`````js filename=intro
function f(x) {
  return g;
}
$(f(1));
`````
