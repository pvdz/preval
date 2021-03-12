# Preval test case

# global.md

> Normalize > Usestrict > Global
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
"use strict";

$();
`````

## Pre Normal

`````js filename=intro
'use strict';
$();
`````

## Normalized

`````js filename=intro
$();
`````

## Output

`````js filename=intro
$();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
