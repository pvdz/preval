# Preval test case

# base_array_in_array_as_statement.md

> Array > Spread > Base array in array as statement
>
> Spreading an array into another array that is assigned to a binding

#TODO

## Input

`````js filename=intro
const x = [1, 2, 3];
['a', ...x, 'b'];
$('the end');
`````

## Pre Normal

`````js filename=intro
const x = [1, 2, 3];
[`a`, ...x, `b`];
$(`the end`);
`````

## Normalized

`````js filename=intro
const x = [1, 2, 3];
[...x];
$(`the end`);
`````

## Output

`````js filename=intro
$(`the end`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'the end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
