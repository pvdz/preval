# Preval test case

# return_implicit.md

> Function inlining > Return implicit
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
function f() {
  return foo; // implicit global
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  return foo;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = foo;
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
