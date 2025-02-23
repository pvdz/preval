# Preval test case

# dyn_prop_null.md

> Normalize > Member access > Dyn prop null
>
> Dynamic property access with ident-like string. This one is not an ident.

## Input

`````js filename=intro
const a = {};
$(a['null']);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a[`null`]);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCalleeParam = a.null;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Object_prototype.null;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.null;
$( a );
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
