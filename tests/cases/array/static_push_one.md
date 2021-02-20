# Preval test case

# static_push_one.md

> Array > Static push one
>
> Pushing a few static values to an array

In this particular case the array could be initialized with the number immediately.

#TODO

## Input

`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Normalized

`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Output

`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
