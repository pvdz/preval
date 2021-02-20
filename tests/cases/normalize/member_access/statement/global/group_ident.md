# Preval test case

# group_ident.md

> Normalize > Member access > Statement > Global > Group ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
($(1), $).length;
`````

## Normalized

`````js filename=intro
$(1);
const tmpCompObj = $;
tmpCompObj.length;
`````

## Output

`````js filename=intro
$(1);
$.length;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
