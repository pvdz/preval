# Preval test case

# write_read_write_write_read.md

> Assigns > Write read write write read
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
x = $(3);
$(x, 'b');
`````

## Normalized

`````js filename=intro
let x = $(1);
$(x, 'a');
x = $(2);
x = $(3);
$(x, 'b');
`````

## Output

`````js filename=intro
const x = $(1);
$(x, 'a');
$(2);
const SSA_x$1 = $(3);
$(SSA_x$1, 'b');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1, 'a'
 - 3: 2
 - 4: 3
 - 5: 3, 'b'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same