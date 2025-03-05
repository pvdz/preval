# Preval test case

# simple_implicit_read_write.md

> Globals > Simple implicit read write
>
> Writing to an implicit global

## Options

Shrug

- skipEval

## Input

`````js filename=intro
$(a);
$(a = 5);
`````

## Pre Normal


`````js filename=intro
$(a);
$((a = 5));
`````

## Normalized


`````js filename=intro
$(a);
a = 5;
let tmpCalleeParam = a;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(a);
a = 5;
const tmpCalleeParam /*:unknown*/ = a;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
$( a );
a = 5;
const b = a;
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
