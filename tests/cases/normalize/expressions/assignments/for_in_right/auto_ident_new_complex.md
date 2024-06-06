# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Assignments > For in right > Auto ident new complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = new ($($))(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
for (let x in (a = new ($($))(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
a = new tmpNewCallee(1);
let tmpForInDeclRhs = a;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output


`````js filename=intro
const tmpNewCallee = $($);
const a = new tmpNewCallee(1);
let x = undefined;
for (x in a) {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
let c = undefined;
for (c in b) {

}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
