# Preval test case

# dyn_prop_true.md

> Normalize > Member access > Dyn prop true
>
> Dynamic property access with ident-like string. This one is not an ident.

## Input

`````js filename=intro
const a = {};
$(a['true']);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a[`true`]);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCalleeParam = a.true;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $Object_prototype.true;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.true;
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
