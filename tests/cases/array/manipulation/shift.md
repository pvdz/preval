# Preval test case

# shift.md

> Array > Manipulation > Shift
>
> Push a number to an array

#TODO

## Input

`````js filename=intro
const arr = [1, 2, 3];
$(arr.shift());
$(arr);
`````

## Pre Normal

`````js filename=intro
const arr = [1, 2, 3];
$(arr.shift());
$(arr);
`````

## Normalized

`````js filename=intro
const arr = [1, 2, 3];
const tmpCallCallee = $;
const tmpCalleeParam = arr.shift();
tmpCallCallee(tmpCalleeParam);
$(arr);
`````

## Output

`````js filename=intro
$(1);
const arr = [2, 3];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = [ 2, 3,, ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: [2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
