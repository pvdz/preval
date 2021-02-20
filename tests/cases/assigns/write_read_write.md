# Preval test case

# write_read_write.md

> Assigns > Write read write
>
> Testing binding mutation optimizations

#TODO

## Input

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
x = $('redundant'); // This assignment should be dropped (but the expression is kept)
`````

## Normalized

`````js filename=intro
let x = $(1);
$(x);
x = $(2);
$(x);
x = $('redundant');
`````

## Output

`````js filename=intro
const x = $(1);
$(x);
const SSA_x = $(2);
$(SSA_x);
$('redundant');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 'redundant'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same