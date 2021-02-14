# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
($(1), $(2), $($)).length;
`````

## Normalized

`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
tmpCompObj.length;
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
tmpCompObj.length;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
