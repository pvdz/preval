# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Statement > For of right > Auto ident unary tilde simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
for (let x of ~arg);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
for (let x of ~arg);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpForOfDeclRhs = ~arg;
let x = undefined;
for (x of tmpForOfDeclRhs) {
}
$(a, arg);
`````

## Output


`````js filename=intro
let x = undefined;
for (x of -2) {
}
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
let a = undefined;
for (a of -2) {

}
const b = {
a: 999,
b: 1000
;
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
