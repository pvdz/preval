# Preval test case

# repeated_prop_writes2.md

> Object literal > Prop write > Repeated prop writes2
>
> When writing to the same obj property multiple times, inline them or remove dupes.

## Input

`````js filename=intro
const b = { x: 1 };
$(b);
b.x = 3;
b.x = 3;
$(b);
`````

## Pre Normal


`````js filename=intro
const b = { x: 1 };
$(b);
b.x = 3;
b.x = 3;
$(b);
`````

## Normalized


`````js filename=intro
const b = { x: 1 };
$(b);
b.x = 3;
b.x = 3;
$(b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
$(b);
b.x = 3;
b.x = 3;
$(b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
$( a );
a.x = 3;
a.x = 3;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
