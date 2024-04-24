# Preval test case

# prop_no_yes_no.md

> Normalize > Nullish > Prop no yes no
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a.b??c.d);
`````

## Pre Normal

`````js filename=intro
const a = {};
$(a.b ?? c.d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a.b;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = c.d;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = $ObjectPrototype.b;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = c.d;
  $(tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $ObjectPrototype.b;
const b = a == null;
if (b) {
  a = c.d;
  $( a );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

c

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
