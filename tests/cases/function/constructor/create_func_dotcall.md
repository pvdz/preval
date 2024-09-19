# Preval test case

# create_func_dotcall.md

> Function > Constructor > Create func dotcall
>
> Creating a function and calling it...

It should be able to resolve this object case and revert the "$dotCall" case to a regular call.

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
const obj /*:object*/ = { Function: Function };
const f = obj.Function(a, b, c, d);
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { Function: Function };
const b = a.Function( a, b, c, d );
const c = b();
$( c );
`````

## Globals

BAD@! Found 4 implicit global bindings:

a, b, c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
