# Preval test case

# init_double_member_expr.md

> normalize > binding > init_double_member_expr
>
> Binding declaration with a long init should be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length.toString;
$(x);
`````

## Normalized

`````js filename=intro
const tmpCompObj = 'foo'.length;
let x = tmpCompObj.toString;
$(x);
`````

## Output

`````js filename=intro
const tmpCompObj = 'foo'.length;
let x = tmpCompObj.toString;
$(x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
