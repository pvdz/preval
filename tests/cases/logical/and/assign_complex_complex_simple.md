# Preval test case

# assign_complex_complex_simple.md

> Logical > And > Assign complex complex simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = $(1) && 2);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$((x = $(1) && 2));
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpCallCallee = $;
x = $(1);
if (x) {
  x = 2;
} else {
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpSSA_x = $(1);
if (tmpSSA_x) {
  tmpSSA_x = 2;
} else {
}
const tmpCalleeParam = tmpSSA_x;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
