# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > For of right > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of ($(1), $(2), $(x)));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for (let x$1 of ($(1), $(2), $(x$1)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpForOfDeclRhs = $(x$1);
let x$1 = undefined;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
throw `Preval: Cannot access \`x\$1\` before initialization`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
throw "Preval: Cannot access `x$1` before initialization";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
