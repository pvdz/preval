# Preval test case

# dyn_prop_false.md

> Normalize > Member access > Dyn prop false
>
> Dynamic property access with ident-like string. This one is not an ident.

## Input

`````js filename=intro
const a = {};
$(a['false']);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a[`false`]);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCalleeParam = a.false;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Object_prototype.false;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.false;
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
