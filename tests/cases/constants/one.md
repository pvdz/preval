# Preval test case

# one.md

> constants > one
>
> Single constant, nothing happens

## Input

`````js filename=intro
const foo = "five";
$(foo)
`````

## Normalized

`````js filename=intro
const foo = 'five';
$(foo);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'five'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
