# Preval test case

# assign_simple_simple_simple.md

> Logical > And > Assign simple simple simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 && 2);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
$((x = 1 && 2));
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpCallCallee = $;
x = 1;
if (x) {
  x = 2;
} else {
}
let tmpCalleeParam = x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
