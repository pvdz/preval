# Preval test case

# coercion.md

> normalize > binary > coercion
>
> Comparison ops trigger coercion mechanisms.

#TODO

## Input

`````js filename=intro
const a = $(1);
const b = 2;
a < b; // This shouldn't be eliminated
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
a < 2;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
