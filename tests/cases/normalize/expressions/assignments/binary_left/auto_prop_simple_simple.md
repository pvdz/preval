# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + $(100));
a.b = 2;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = { b: $(1) }) + $(100));
a.b = 2;
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
a.b = 2;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpBinBothRhs = $(100);
const a = { b: tmpObjLitVal };
const tmpCalleeParam = a + tmpBinBothRhs;
$(tmpCalleeParam);
a.b = 2;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 100 );
const c = { b: a };
const d = c + b;
$( d );
c.b = 2;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: '[object Object]100'
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
