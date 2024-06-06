# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Let > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 0 || 2;
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 0 || 2;
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 0;
if (xyz) {
} else {
  xyz = 2;
}
$(xyz);
$(a);
`````

## Output


`````js filename=intro
$(2);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
const a = {
a: 999,
b: 1000
;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
