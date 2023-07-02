# Preval test case

# return_this.md

> Function > Constructor > Return this
>
> Special case return this

#TODO

## Input

`````js filename=intro
let glbl;
try {
  const tmpCallComplexCallee = Function(`return this`);
  const tmpReturnArg = tmpCallComplexCallee();
  glbl = tmpReturnArg;
} catch (e) {
  glbl = window;
}
$(glbl);
`````

## Pre Normal

`````js filename=intro
let glbl;
try {
  const tmpCallComplexCallee = Function(`return this`);
  const tmpReturnArg = tmpCallComplexCallee();
  glbl = tmpReturnArg;
} catch (e) {
  glbl = window;
}
$(glbl);
`````

## Normalized

`````js filename=intro
let glbl = undefined;
try {
  const tmpCallComplexCallee = function () {
    debugger;
    return window;
  };
  const tmpReturnArg = tmpCallComplexCallee();
  glbl = tmpReturnArg;
} catch (e) {
  glbl = window;
}
$(glbl);
`````

## Output

`````js filename=intro
$(window);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Maximum call stack size exceeded ]>')

Pre normalization calls: Same

Normalized calls: BAD?!
 - eval returned: ('<crash[ <ref> is not defined ]>')

Final output calls: BAD!!
 - eval returned: ('<crash[ <ref> is not defined ]>')
