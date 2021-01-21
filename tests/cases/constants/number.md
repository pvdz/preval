# Preval test case

# copy.md

> constants > copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = 5;
const bar = foo;
$(bar)
`````

## Normalized

`````js filename=intro
const foo = 5;
const bar = foo;
$(bar);
`````

## Output

`````js filename=intro
$(5);
`````

## Result

Should call `$` with:
 - 0: 5
 - 1: undefined

Normalized calls: Same

Final output calls: Same
