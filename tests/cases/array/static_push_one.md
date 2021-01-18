# Preval test case

# static_push.md

> array > static_push
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

## Result

Should call `$` with:
[[[1]], null];

Normalized calls: Same

Final output calls: Same
