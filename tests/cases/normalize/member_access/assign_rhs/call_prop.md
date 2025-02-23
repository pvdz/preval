# Preval test case

# call_prop.md

> Normalize > Member access > Assign rhs > Call prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
let x = 10;
x = $('foo').length;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = 10;
x = $(`foo`).length;
$(x);
`````

## Normalized


`````js filename=intro
let x = 10;
const tmpAssignRhsProp = $(`foo`);
x = tmpAssignRhsProp.length;
$(x);
`````

## Output


`````js filename=intro
const tmpAssignRhsProp /*:unknown*/ = $(`foo`);
const x /*:unknown*/ = tmpAssignRhsProp.length;
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
