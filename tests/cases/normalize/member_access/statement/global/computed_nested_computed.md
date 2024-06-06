# Preval test case

# computed_nested_computed.md

> Normalize > Member access > Statement > Global > Computed nested computed
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
obj['a']['b'];
`````

## Pre Normal


`````js filename=intro
const obj = { a: { b: $() } };
obj[`a`][`b`];
`````

## Normalized


`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpCompObj = obj.a;
tmpCompObj.b;
`````

## Output


`````js filename=intro
$();
`````

## PST Output

With rename=true

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
