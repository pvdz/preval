# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
let x = $('foo').length;
$(x);
`````

## Normalized

`````js filename=intro
const tmpCompObj = $('foo');
let x = tmpCompObj.length;
$(x);
`````

## Output

`````js filename=intro
const tmpCompObj = $('foo');
const x = tmpCompObj.length;
$(x);
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
