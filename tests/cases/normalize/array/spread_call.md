# Preval test case

# spread_call.md

> Normalize > Array > Spread call
>
> Spread arg that is simple should not change

## Input

`````js filename=intro
$([...$("foo")]);
`````

## Pre Normal


`````js filename=intro
$([...$(`foo`)]);
`````

## Normalized


`````js filename=intro
const tmpArrSpread = $(`foo`);
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpArrSpread /*:unknown*/ = $(`foo`);
const tmpCalleeParam /*:array*/ = [...tmpArrSpread];
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "foo" );
const b = [ ...a ];
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: ['f', 'o', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
