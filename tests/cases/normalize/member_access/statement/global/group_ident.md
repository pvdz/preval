# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
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

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
