# Preval test case

# vd_after_return.md

> Dce > Vd after return
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
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {
  return undefined;
}
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
