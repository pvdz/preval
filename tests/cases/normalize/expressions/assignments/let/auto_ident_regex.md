# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Assignments > Let > Auto ident regex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = /foo/);
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = /foo/);
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let xyz = a;
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const a /*:regex*/ = /foo/;
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
