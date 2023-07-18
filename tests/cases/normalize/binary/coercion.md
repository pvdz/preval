# Preval test case

# coercion.md

> Normalize > Binary > Coercion
>
> Comparison ops trigger coercion mechanisms.

#TODO

## Input

`````js filename=intro
const a = $(1);
const b = 2;
a < b; // This shouldn't be eliminated
`````

## Pre Normal

`````js filename=intro
const a = $(1);
const b = 2;
a < b;
`````

## Normalized

`````js filename=intro
const a = $(1);
const b = 2;
a < b;
`````

## Output

`````js filename=intro
const a = $(1);
a ** 0;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
a ** 0;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
