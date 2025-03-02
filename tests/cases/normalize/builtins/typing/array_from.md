# Preval test case

# array_from.md

> Normalize > Builtins > Typing > Array from
>
> Should adhere to the `returns` declaration

## Input

`````js filename=intro
const str = $('abc');
const arr = Array.from(str);
$(arr);
`````

## Pre Normal


`````js filename=intro
const str = $(`abc`);
const arr = Array.from(str);
$(arr);
`````

## Normalized


`````js filename=intro
const str = $(`abc`);
const arr = $Array_from(str);
$(arr);
`````

## Output


`````js filename=intro
const str /*:unknown*/ = $(`abc`);
const arr /*:array*/ = $Array_from(str);
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "abc" );
const b = $Array_from( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'abc'
 - 2: ['a', 'b', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
