# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = typeof $(arg)));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
for (let x of (a = typeof $(arg)));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
let x = undefined;
const a = typeof tmpUnaryArg;
for (x of a) {
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = undefined;
const c = typeof a;
for (b of c) {

}
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
