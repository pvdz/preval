# Preval test case

# computed_nested_computed.md

> Normalize > Member access > Call arg > Computed nested computed
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj['a']['b']);
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
$(obj[`a`][`b`]);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCallCallee = $;
const tmpCompObj = obj.a;
const tmpCalleeParam = tmpCompObj.b;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpObjLitVal$1 = $();
$(tmpObjLitVal$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $();
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
