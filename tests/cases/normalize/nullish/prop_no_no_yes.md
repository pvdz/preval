# Preval test case

# prop_no_no_yes.md

> Normalize > Nullish > Prop no no yes
>
> Mix nullish with regular member expressions

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
const tmpCompObj = $ObjectPrototype.b;
const tmpCalleeParam = tmpCompObj.c;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  d;
  $(d);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.b;
const b = a.c;
const c = b == null;
if (c) {
  d;
  $( d );
}
else {
  $( b );
}
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
