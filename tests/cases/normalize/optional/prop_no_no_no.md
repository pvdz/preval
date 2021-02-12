# Preval test case

# prop_no_no_no.md

> normalize > optional > prop_no_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c.d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCompObj$1 = a.b;
const tmpCompObj = tmpCompObj$1.c;
const tmpCalleeParam = tmpCompObj.d;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCompObj$1 = a.b;
const tmpCompObj = tmpCompObj$1.c;
const tmpCalleeParam = tmpCompObj.d;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
