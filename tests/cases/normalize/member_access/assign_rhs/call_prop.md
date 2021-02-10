# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
