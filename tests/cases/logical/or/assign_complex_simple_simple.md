# Preval test case

# assign_complex_simple_simple.md

> Logical > Or > Assign complex simple simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 || 2);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$((x = 1 || 2));
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpCallCallee = $;
x = 1;
if (x) {
} else {
  x = 2;
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpSSA_x = 1;
if (tmpSSA_x) {
} else {
  tmpSSA_x = 2;
}
const tmpCalleeParam = tmpSSA_x;
$(tmpCalleeParam);
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
