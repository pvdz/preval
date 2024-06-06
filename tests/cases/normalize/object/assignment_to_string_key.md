# Preval test case

# assignment_to_string_key.md

> Normalize > Object > Assignment to string key
>
> Should convert the key to a regular property

#TODO

## Input

`````js filename=intro
const o = {x: 1};
o['x'] = 2;
$(o);
`````

## Pre Normal


`````js filename=intro
const o = { x: 1 };
o[`x`] = 2;
$(o);
`````

## Normalized


`````js filename=intro
const o = { x: 1 };
o.x = 2;
$(o);
`````

## Output


`````js filename=intro
const o = { x: 2 };
$(o);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 2 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
