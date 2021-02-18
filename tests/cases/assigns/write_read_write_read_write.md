# Preval test case

# redundant_back2back.md

> assigns > redundant_back2back
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

Normalized calls: Same

Final output calls: Same
