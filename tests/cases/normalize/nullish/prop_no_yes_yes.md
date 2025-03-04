# Preval test case

# prop_no_yes_yes.md

> Normalize > Nullish > Prop no yes yes
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b??c??d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a.b ?? c ?? d);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a.b;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = c;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = d;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = $Object_prototype.b;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
let tmpIfTest$1 /*:boolean*/ = false;
if (tmpIfTest) {
  tmpCalleeParam = c;
  tmpIfTest$1 = tmpCalleeParam == null;
} else {
  tmpIfTest$1 = tmpCalleeParam == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = d;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $Object_prototype.b;
const b = a == null;
let e = false;
if (b) {
  a = c;
  e = a == null;
}
else {
  e = a == null;
}
if (e) {
  const f = d;
  $( f );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

c, d

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
