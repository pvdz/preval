# Preval test case

# minus_builtin.md

> Constants > Minus builtin
>
> Negative Infinity should be treated as a constant as well

#TODO

## Input

`````js filename=intro
const x = -Infinity;
const y = x;
$(y); // Should be inlined to -5
`````

## Normalized

`````js filename=intro
const x = -Infinity;
const y = x;
$(y);
`````

## Output

`````js filename=intro
const x = -Infinity;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
