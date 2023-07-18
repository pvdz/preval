# Preval test case

# decl_else_upd.md

> Arr mutation > Decl else upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
if ($) {
} else {
  arr[0] = 2;
}
$(arr);
`````

## Pre Normal

`````js filename=intro
const arr = [];
if ($) {
} else {
  arr[0] = 2;
}
$(arr);
`````

## Normalized

`````js filename=intro
const arr = [];
if ($) {
} else {
  arr[0] = 2;
}
$(arr);
`````

## Output

`````js filename=intro
const arr = [];
if ($) {
} else {
  arr[0] = 2;
}
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
if ($) {

}
else {
  a[0] = 2;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
