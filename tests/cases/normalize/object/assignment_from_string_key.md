# Preval test case

# assignment_from_string_key.md

> Normalize > Object > Assignment from string key
>
> Should convert the key to a regular property

#TODO

## Input

`````js filename=intro
const o = {x: 1};
let y = 1;
y = o['x'] ;
$(y, o);
`````

## Pre Normal

`````js filename=intro
const o = { x: 1 };
let y = 1;
y = o['x'];
$(y, o);
`````

## Normalized

`````js filename=intro
const o = { x: 1 };
let y = 1;
y = o.x;
$(y, o);
`````

## Output

`````js filename=intro
const o = { x: 1 };
const y = o.x;
$(y, o);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
