# Preval test case

# base_tdz_impossible.md

> Ssa > Base tdz impossible
>
> Contrived example

This is a tdz example we can not detect safely

#TODO

## Input

`````js filename=intro
if ($) $(x);
let x = $(5);
$(x);
// Next write can be SSA'd
x = $(10);
$(x);
`````

## Pre Normal

`````js filename=intro
if ($) $(x);
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Normalized

`````js filename=intro
if ($) {
  $(x);
} else {
}
let x = $(5);
$(x);
x = $(10);
$(x);
`````

## Output

`````js filename=intro
if ($) {
  throw 'Preval: Cannot access `x` before initialization';
} else {
}
const x = $(5);
$(x);
const tmpSSA_x = $(10);
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
