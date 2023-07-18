# Preval test case

# decl_if_upd.md

> Arr mutation > Decl if upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## Pre Normal

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## Normalized

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## Output

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
if ($) {
  a[0] = 1;
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
