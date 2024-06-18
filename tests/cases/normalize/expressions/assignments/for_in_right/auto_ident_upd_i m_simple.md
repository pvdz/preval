# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (let x in (a = b--));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
for (let x in (a = b--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b - 1;
a = tmpPostUpdArgIdent;
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a, b);
`````

## Output


`````js filename=intro
let x = undefined;
for (x in 1) {
}
$(1, 0);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a in 1) {

}
$( 1, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
