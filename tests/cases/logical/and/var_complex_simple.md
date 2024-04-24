# Preval test case

# var_complex_simple.md

> Logical > And > Var complex simple
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
const x = $(1) && 2;
$(x);
`````

## Pre Normal

`````js filename=intro
const x = $(1) && 2;
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
} else {
}
$(x);
`````

## Output

`````js filename=intro
let x = $(1);
if (x) {
  x = 2;
  $(2);
} else {
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  a = 2;
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
