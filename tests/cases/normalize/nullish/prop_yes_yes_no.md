# Preval test case

# prop_yes_yes_no.md

> Normalize > Nullish > Prop yes yes no
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a??b??c.d);
`````

## Pre Normal


`````js filename=intro
const a = {};
$(a ?? b ?? c.d);
`````

## Normalized


`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = b;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = c.d;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const a = {};
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
