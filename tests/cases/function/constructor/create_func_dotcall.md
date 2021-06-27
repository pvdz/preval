# Preval test case

# create_func_dotcall.md

> Function > Constructor > Create func dotcall
>
> Creating a function and calling it...

It should be able to resolve this object case and revert the "$dotCall" case to a regular call.

#TODO

## Input

`````js filename=intro
const obj = {Function};
const f = obj.Function(a, b, c, d);
$(f());
`````

## Pre Normal

`````js filename=intro
const obj = { Function: Function };
const f = obj.Function(a, b, c, d);
$(f());
`````

## Normalized

`````js filename=intro
const obj = { Function: Function };
const f = obj.Function(a, b, c, d);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = { Function: Function };
const f = obj.Function(a, b, c, d);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 5 implicit global bindings:

Function, a, b, c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
