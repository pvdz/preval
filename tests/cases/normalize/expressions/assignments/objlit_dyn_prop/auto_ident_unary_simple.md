# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ [(a = typeof x)]: 10 });
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$({ [(a = typeof x)]: 10 });
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof x;
let tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
const tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { number: 10 };
$(tmpCalleeParam);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { number: 10 };
$( a );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { number: '10' }
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
