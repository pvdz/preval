# Preval test case

# write_write.md

> Ref tracking > Write write
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
x = $(2);
$(x);
`````

## Output

`````js filename=intro
$(1);
const x = $(2);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same