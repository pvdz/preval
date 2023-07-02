# Preval test case

# static_push_one_two.md

> Arr mutation > Static push one two
>
> Pushing a few static values to an array

In this particular case the array could be initialized with the numbers immediately.

#TODO

## Input

`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````

## Pre Normal

`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````

## Normalized

`````js filename=intro
const arr = [];
arr.push(1);
arr.push(2);
$(arr);
`````

## Output

`````js filename=intro
const arr = [1, 2];
$(arr);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
