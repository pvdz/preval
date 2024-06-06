# Preval test case

# different_block.md

> Object literal > Static prop lookups > Different block
>
> If we can statically resolve a property lookup, we should

#TODO

## Input

`````js filename=intro
const o = {x: $(1)};
if ($) {
  $(o.x);
}
`````

## Pre Normal


`````js filename=intro
const o = { x: $(1) };
if ($) {
  $(o.x);
}
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
if ($) {
  const tmpCallCallee = $;
  const tmpCalleeParam = o.x;
  tmpCallCallee(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
if ($) {
  $(tmpObjLitVal);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if ($) {
  $( a );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
