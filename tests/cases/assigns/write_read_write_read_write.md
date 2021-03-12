# Preval test case

# write_read_write_read_write.md

> Assigns > Write read write read write
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2); // SSA since all future reads can only inspect this write
$(x, 'b');
`````

## Pre Normal

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
$(x, 'b');
`````

## Normalized

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
$(x, 'b');
`````

## Output

`````js filename=intro
const x = $(1);
$(x, 'a');
const SSA_x = $(2);
$(SSA_x, 'b');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 2
 - 4: 2, 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
