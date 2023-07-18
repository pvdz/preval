# Preval test case

# base.md

> Array > Manipulation > Base
>
> Push a number to an array

#TODO

## Input

`````js filename=intro
const arr = [];
arr.push(1);
$(arr);
`````

## Pre Normal

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
const arr = [1];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1,, ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
