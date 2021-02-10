# Preval test case

# global.md

> normalize > usestrict > global
>
> Make sure the directive is not kept because of its special status

## Input

`````js filename=intro
"use strict";

$();
`````

## Normalized

`````js filename=intro
$();
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
