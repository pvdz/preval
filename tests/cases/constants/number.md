# Preval test case

# number.md

> Constants > Number
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

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
