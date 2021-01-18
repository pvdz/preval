# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = NaN;
const bar = foo;
$(bar);
`````

## Output

`````js filename=intro
$(NaN);
`````

## Result

Should call `$` with:
[[null], null];

Normalized calls: Same

Final output calls: Same
