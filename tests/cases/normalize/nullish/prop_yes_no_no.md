# Preval test case

# prop_yes_no_no.md

> Normalize > Nullish > Prop yes no no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b.c.d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a ?? b.c.d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  const tmpAssignRhsProp = b.c;
  tmpCalleeParam = tmpAssignRhsProp.d;
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
