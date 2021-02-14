# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
let x = 10;
x = ($(1), $).length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
$(1);
const tmpAssignRhsProp = $;
x = tmpAssignRhsProp.length;
$(x);
`````

## Output

`````js filename=intro
let x = 10;
$(1);
x = $.length;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
