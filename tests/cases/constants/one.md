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
$('five');
`````

## Result

Should call `$` with:
 - 0: "five"
 - 1: undefined

Normalized calls: Same

Final output calls: Same
