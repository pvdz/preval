# Preval test case

# assignment_to_string_key.md

> normalize > object > assignment_to_string_key
>
> Should convert the key to a regular property

#TODO

## Input

`````js filename=intro
const o = {x: 1};
o['x'] = 2;
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
const o = { x: 1 };
o.x = 2;
$(o);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
