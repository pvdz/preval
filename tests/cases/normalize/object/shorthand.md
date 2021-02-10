# Preval test case

# shorthand.md

> normalize > object > shorthand
>
> Shorthand should normalize to a regular property

#TODO

## Input

`````js filename=intro
const x = 10;
const obj = {x};
$(obj);
`````

## Normalized

`````js filename=intro
const x = 10;
const obj = { x: x };
$(obj);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
