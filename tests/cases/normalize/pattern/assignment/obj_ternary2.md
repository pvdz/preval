# Preval test case

# obj_ternary2.md

> Normalize > Pattern > Assignment > Obj ternary2
>
> Regression from obj param with default

Regression was causing infinite loop

## Input

`````js filename=intro
let bindingPatternObjRoot = undefined;
if ($) {
  bindingPatternObjRoot = 1;
} else {
  bindingPatternObjRoot = 2;
}
$(bindingPatternObjRoot);
`````

## Pre Normal


`````js filename=intro
let bindingPatternObjRoot = undefined;
if ($) {
  bindingPatternObjRoot = 1;
} else {
  bindingPatternObjRoot = 2;
}
$(bindingPatternObjRoot);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = undefined;
if ($) {
  bindingPatternObjRoot = 1;
} else {
  bindingPatternObjRoot = 2;
}
$(bindingPatternObjRoot);
`````

## Output


`````js filename=intro
if ($) {
  $(1);
} else {
  $(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  $( 1 );
}
else {
  $( 2 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
