# Preval test case

# call_prop.md

> Normalize > Member access > Statement > Global > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$('foo').length;
`````

## Pre Normal


`````js filename=intro
$(`foo`).length;
`````

## Normalized


`````js filename=intro
const tmpCompObj = $(`foo`);
tmpCompObj.length;
`````

## Output


`````js filename=intro
const tmpCompObj = $(`foo`);
tmpCompObj.length;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
a.length;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
