# Preval test case

# prop_no_no_yes.md

> Normalize > Nullish > Prop no no yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b.c??d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a.b.c ?? d);
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
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjectPrototype = Object.prototype;
const tmpCompObj = tmpObjectPrototype.b;
let tmpCalleeParam = tmpCompObj.c;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = d;
} else {
}
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 1 implicit global bindings:

d

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
