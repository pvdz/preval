# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = void $(100)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = void $(100)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
$(100);
let x = undefined;
for (x in undefined) {
}
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
let a = undefined;
for (a in undefined) {

}
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
