# Preval test case

# one.md

> Constants > One
>
> Single constant, nothing happens

## Input

`````js filename=intro
const foo = "five";
$(foo)
`````

## Pre Normal

`````js filename=intro
const foo = 'five';
$(foo);
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

## Globals

None

## Result

Should call `$` with:
 - 1: 'five'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
