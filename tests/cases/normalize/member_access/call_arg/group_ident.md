# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
$(($(1), $).length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
const tmpCompObj = $;
const tmpCalleeParam = tmpCompObj.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
const tmpCalleeParam = $.length;
$(tmpCalleeParam);
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
