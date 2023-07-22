# Preval test case

# write_read_write.md

> Ref tracking > Write read write
>
> Ref tracking cases

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
`````

## Output

`````js filename=intro
const x = $(1);
$(x);
const tmpClusterSSA_x = $(2);
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
const b = $( 2 );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
