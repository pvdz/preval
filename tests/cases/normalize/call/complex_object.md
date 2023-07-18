# Preval test case

# complex_object.md

> Normalize > Call > Complex object
>
> Calls should have simple objects

#TODO

## Input

`````js filename=intro
const a = {b: $};
$(a).b(1);
`````

## Pre Normal

`````js filename=intro
const a = { b: $ };
$(a).b(1);
`````

## Normalized

`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
tmpCallObj.b(1);
`````

## Output

`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
tmpCallObj.b(1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
b.b( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
