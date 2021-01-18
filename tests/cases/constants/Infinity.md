# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = Infinity;
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = Infinity;
const bar = foo;
$(bar);
`````

## Output

`````js filename=intro
$(Infinity);
`````

## Result

Should call `$` with:
[[null], null];

Normalized calls: Same

Final output calls: Same
