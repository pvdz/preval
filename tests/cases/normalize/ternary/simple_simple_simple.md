# Preval test case

# simple_simple_simple.md

> normalize > ternary > simple_simple_simple
>
> Ternary (conditional expressions) should have their args be normalized. But they shouldn't be pulled out, obviously.

#TODO

## Input

`````js filename=intro
const a = 1 ? 2 : 3
const b = 0 ? 4 : 5
$(a, b)
`````

## Normalized

`````js filename=intro
const a = 1 ? 2 : 3;
const b = 0 ? 4 : 5;
$(a, b);
`````

## Output

`````js filename=intro
const a = 1 ? 2 : 3;
const b = 0 ? 4 : 5;
$(a, b);
`````
