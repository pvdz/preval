# Preval test case

# var_simple_simple.md

> Logical > And > Var simple simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 && 2;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = 1 && 2;
$(x);
`````

## Normalized


`````js filename=intro
let x = 1;
if (x) {
  x = 2;
} else {
}
$(x);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
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
