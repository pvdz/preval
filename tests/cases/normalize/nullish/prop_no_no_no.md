# Preval test case

# prop_no_no_no.md

> Normalize > Nullish > Prop no no no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c.d);
`````

## Pre Normal

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
const tmpCompObj$1 = a.b;
const tmpCompObj = tmpCompObj$1.c;
const tmpCalleeParam = tmpCompObj.d;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
