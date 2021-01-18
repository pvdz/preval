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
'use strict';
$();
`````

## Output

`````js filename=intro
$();
`````

## Result

Should call `$` with:
[[], null];

Normalized calls: Same

Final output calls: Same
