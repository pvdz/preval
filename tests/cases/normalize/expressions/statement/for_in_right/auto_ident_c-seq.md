# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > For in right > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x in ($(1), $(2), $(x)));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpForInDeclRhs = $(x$1);
let x$1;
for (x$1 in tmpForInDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpForInDeclRhs = $(x$1);
let x$1;
for (x$1 in tmpForInDeclRhs) {
}
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
