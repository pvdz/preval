# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Let > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = arguments);
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = arguments);
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = arguments;
let xyz = a;
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const a = arguments;
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
$( a );
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: '<Global Arguments>'
 - 2: '<Global Arguments>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
