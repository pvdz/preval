# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$($('foo').length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCompObj = $('foo');
const tmpCalleeParam = tmpCompObj.length;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCompObj = $('foo');
const tmpCalleeParam = tmpCompObj.length;
$(tmpCalleeParam);
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
