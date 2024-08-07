# Preval test case

# multiple_const_init.md

> Normalize > Var > Multiple const init
>
> Declaring multiple bindings should be normalized to separate declarations such that there is one binding per declaration.

## Input

`````js filename=intro
const a = $(1), b = $(2), c = $(3);
`````

## Pre Normal


`````js filename=intro
const a = $(1),
  b = $(2),
  c = $(3);
`````

## Normalized


`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
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
