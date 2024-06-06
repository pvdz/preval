# Preval test case

# global_end.md

> Normalize > Sequence > Global end
>
> Nested groups can be flattened. We only care about the normalized output for this case. (I mean, it'll be resolved entirely, obviously)

## Input

`````js filename=intro
($(1), $(2), $(3), $(4), ($(5), $(6)));
`````

## Pre Normal


`````js filename=intro
$(1), $(2), $(3), $(4), ($(5), $(6));
`````

## Normalized


`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
`````

## Output


`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(5);
$(6);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( 5 );
$( 6 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
