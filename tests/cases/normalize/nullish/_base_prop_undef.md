# Preval test case

# _base_prop_undef.md

> Normalize > Nullish > Base prop undef
>
> Simple example

## Input

`````js filename=intro
var f = undefined;
$(f??x);
`````

## Pre Normal


`````js filename=intro
let f = undefined;
f = undefined;
$(f ?? x);
`````

## Normalized


`````js filename=intro
let f = undefined;
f = undefined;
let tmpCalleeParam = f;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = x;
} else {
}
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = x;
$(tmpClusterSSA_tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = x;
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
