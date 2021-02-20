# Preval test case

# group_call.md

> Normalize > Member access > Call arg > Group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
$(($(1), $(2), $($)).length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
$(1);
$(2);
const tmpCompObj = $($);
const tmpCalleeParam = tmpCompObj.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpCompObj = $($);
const tmpCalleeParam = tmpCompObj.length;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: '<$>'
 - 4: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
