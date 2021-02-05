# Preval test case

# prop_no_no_yes.md

> normalize > nullish > prop_no_no_yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c??d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCompObj = a.b;
let tmpCalleeParam = tmpCompObj.c;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = d;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
const tmpCallCallee = $;
const tmpCompObj = a.b;
let tmpCalleeParam = tmpCompObj.c;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = d;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
