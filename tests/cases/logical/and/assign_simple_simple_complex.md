# Preval test case

# assign_simple_simple_complex.md

> Logical > And > Assign simple simple complex
>
> Logical ops need to be normalized

## Input

`````js filename=intro
var x;
$(x = 1 && $(2));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$((x = 1 && $(2)));
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 1;
if (x) {
  x = $(2);
} else {
}
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x /*:unknown*/ = $(2);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
