# Preval test case

# branched_return.md

> Ref tracking > Last write analysis > Branched return
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
let x = $(`a`);
$(x);
x = $(`b`);
$(x);
`````

## Normalized

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
$(x);
`````

## Output

`````js filename=intro
let x = $(`a`);
$(x);
x = $(`b`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( "a" );
$( a );
a = $( "b" );
$( a );
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
