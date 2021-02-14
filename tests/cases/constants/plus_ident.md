# Preval test case

# minus_number.md

> constants > minus_number
>
> Positive idents that are not builtins should be treated as normal

#TODO

## Input

`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(z); // Should be inlined to y, not -5
`````

## Normalized

`````js filename=intro
const x = $(5);
const y = +x;
const z = y;
$(z);
`````

## Output

`````js filename=intro
const x = $(5);
const y = +x;
$(y);
`````

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
