# Preval test case

# assign_simple_complex_simple.md

> Logical > And > Assign simple complex simple
>
> Logical ops need to be normalized

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
const x /*:unknown*/ = $(1);
if (x) {
  $(2);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
else {
  $( a );
}
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
