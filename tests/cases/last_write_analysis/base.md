# Preval test case

# base.md

> Last write analysis > Base
>
> Last write analysis tracks which reads can reach which writes. We test this through single scope SSA since that's directly depending on this analysis. These are the cases to attempt to cover all cross cases.

#TODO

## Input

`````js filename=intro
let x = $('a');
$(x);
// SSA the next write. This write can only be reached by the next read and that read can
// only reach this write.
x = $('b');
$(x);
`````

## Pre Normal

`````js filename=intro
let x = $('a');
$(x);
x = $('b');
$(x);
`````

## Normalized

`````js filename=intro
let x = $('a');
$(x);
x = $('b');
$(x);
`````

## Output

`````js filename=intro
const x = $('a');
$(x);
const tmpClusterSSA_x = $('b');
$(tmpClusterSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 'b'
 - 4: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
