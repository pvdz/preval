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
const obj = { x: 10 };
$(obj);
`````

## Result

Should call `$` with:
[[{ x: 10 }], null];

Normalized calls: Same

Final output calls: Same
