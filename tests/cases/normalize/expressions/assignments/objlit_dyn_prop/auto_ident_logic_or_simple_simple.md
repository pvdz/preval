# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = 0 || 2)]: 10 });
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = 0 || 2)]: 10 });
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [2]: 10 };
$(tmpCalleeParam);
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { [ 2 ]: 10 };
$( a );
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 2: '10' }
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
