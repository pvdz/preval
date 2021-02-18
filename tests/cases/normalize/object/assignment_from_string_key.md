# Preval test case

# assignment_to_string_key.md

> normalize > object > assignment_to_string_key
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
const SSA_y = o.x;
$(SSA_y, o);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, { x: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
