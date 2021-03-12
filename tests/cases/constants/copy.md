# Preval test case

# copy.md

> Constants > Copy
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = "five";
const bar = foo;
$(bar)
`````

## Pre Normal

`````js filename=intro
const foo = 'five';
const bar = foo;
$(bar);
`````

## Normalized

`````js filename=intro
const foo = 'five';
const bar = foo;
$(bar);
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
