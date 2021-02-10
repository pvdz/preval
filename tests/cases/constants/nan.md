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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
