# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
$('foo').length;
`````

## Normalized

`````js filename=intro
const tmpCompObj = $('foo');
tmpCompObj.length;
`````

## Output

`````js filename=intro
const tmpCompObj = $('foo');
tmpCompObj.length;
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
