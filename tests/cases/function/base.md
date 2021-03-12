# Preval test case

# base.md

> Function > Base
>
> Func decl after return that is used

The DCE should not eliminate the function or the code will break. This one is simple, eh.

#TODO

## Input

`````js filename=intro
function f(x) {
}
$(f(1));
`````

## Pre Normal

`````js filename=intro
let f = function (x) {};
$(f(1));
`````

## Normalized

`````js filename=intro
let f = function (x) {};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
