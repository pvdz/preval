# Preval test case

# assign_simple_simple_simple.md

> Logical > Or > Assign simple simple simple
>
> Logical ops need to be normalized

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
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
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
