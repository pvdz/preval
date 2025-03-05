# Preval test case

# prop_yes_yes_yes.md

> Normalize > Nullish > Prop yes yes yes
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a??b??c??d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a ?? b ?? c ?? d);
`````

## Normalized


`````js filename=intro
const a = {};
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = b;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = c;
} else {
}
const tmpIfTest$3 = tmpCalleeParam == null;
if (tmpIfTest$3) {
  tmpCalleeParam = d;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a /*:object*/ = {};
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
