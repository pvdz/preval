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

## Normalized

`````js filename=intro
let x = 10;
const tmpAssignRhsProp = $('foo');
x = tmpAssignRhsProp.length;
$(x);
`````

## Output

`````js filename=intro
const tmpAssignRhsProp = $('foo');
const SSA_x = tmpAssignRhsProp.length;
$(SSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
