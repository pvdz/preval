# Preval test case

# call_prop.md

> Normalize > Member access > Var init > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
let x = $('foo').length;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = $(`foo`).length;
$(x);
`````

## Normalized


`````js filename=intro
const tmpCompObj = $(`foo`);
let x = tmpCompObj.length;
$(x);
`````

## Output


`````js filename=intro
const tmpCompObj /*:unknown*/ = $(`foo`);
const x /*:unknown*/ = tmpCompObj.length;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
const b = a.length;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
