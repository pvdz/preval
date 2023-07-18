# Preval test case

# auto_ident_s-seq.md

> Normalize > Expressions > Assignments > For of right > Auto ident s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = ($(1), $(2), x)));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
for (let x$1 of (a = ($(1), $(2), x$1)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = x$1;
let tmpForOfDeclRhs = a;
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
