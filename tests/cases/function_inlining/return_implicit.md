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

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return foo;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return foo;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
foo;
$(foo);
`````

## PST Output

With rename=true

`````js filename=intro
foo;
$( foo );
`````

## Globals

BAD@! Found 1 implicit global bindings:

foo

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
