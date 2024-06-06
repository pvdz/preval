# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > For of right > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = void $(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x of (a = void $(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let tmpForOfDeclRhs = a;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
$(100);
let x = undefined;
for (x of undefined) {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = undefined;
for (a of undefined) {

}
$( undefined );
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
