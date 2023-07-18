# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Let > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = []);
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = []);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = [];
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
