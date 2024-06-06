# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident unary plus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = +$(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = +$(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(100);
const a = +tmpUnaryArg;
let x = undefined;
for (x of a) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = +a;
let c = undefined;
for (c of b) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
