# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Assignments > Let > Auto ident new ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = new $(1));
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = new $(1));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = new $(1);
let xyz = a;
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const a = new $(1);
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
