# Preval test case

# computed_no_no_no.md

> normalize > optional > computed_no_no_no
>
> Mix optional with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {b: {c: {d: 10}}};
const b = 'b', c = 'c', d = 'd';
$(a[b][c][d]);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const b = 'b';
const c = 'c';
const d = 'd';
const tmpCallCallee = $;
const tmpCompObj$1 = a[b];
const tmpCompObj = tmpCompObj$1[c];
const tmpCalleeParam = tmpCompObj[d];
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = { d: 10 };
const tmpObjLitVal = { c: tmpObjLitVal$1 };
const a = { b: tmpObjLitVal };
const tmpCompObj$1 = a['b'];
const tmpCompObj = tmpCompObj$1['c'];
const tmpCalleeParam = tmpCompObj['d'];
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
