# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Assignments > If > Auto ident call ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = $(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $(1);
let tmpIfTest = a;
$(a);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = $(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
