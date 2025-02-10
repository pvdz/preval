# Preval test case

# global_literal2.md

> Normalize > Nullish > Global literal2
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$(unknown??length);
`````

## Pre Normal


`````js filename=intro
$(unknown ?? length);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = unknown;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = unknown;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
if (tmpIfTest) {
  length;
  $(length);
} else {
  $(tmpCalleeParam);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = unknown;
const b = a == null;
if (b) {
  length;
  $( length );
}
else {
  $( a );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

unknown, length

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
