# Preval test case

# multiple_let_init.md

> Normalize > Var > Multiple let init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

#TODO

## Input

`````js filename=intro
let a = $(1), b = $(2), c = $(3);
`````

## Pre Normal


`````js filename=intro
let a = $(1),
  b = $(2),
  c = $(3);
`````

## Normalized


`````js filename=intro
let a = $(1);
let b = $(2);
let c = $(3);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(3);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
