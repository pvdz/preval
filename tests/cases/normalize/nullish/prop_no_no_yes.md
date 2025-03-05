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
const tmpCompObj = a.b;
let tmpCalleeParam = tmpCompObj.c;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = d;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCompObj /*:unknown*/ = $Object_prototype.b;
const tmpCalleeParam /*:unknown*/ = tmpCompObj.c;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = d;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b == null;
if (c) {
  const e = d;
  $( e );
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
