# Preval test case

# var_simple_complex.md

> Logical > And > Var simple complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = 1 && $(2);
$(x);
`````

## Pre Normal

`````js filename=intro
const x = 1 && $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = 1;
if (x) {
  x = $(2);
} else {
}
$(x);
`````

## Output

`````js filename=intro
const tmpClusterSSA_x = $(2);
$(tmpClusterSSA_x);
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
