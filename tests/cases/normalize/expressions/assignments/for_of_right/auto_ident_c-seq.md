# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > For of right > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = $(x$1);
let tmpForOfDeclRhs = a;
let x$1;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const SSA_a = $(x$1);
let x$1;
for (x$1 of SSA_a) {
}
$(SSA_a, 1);
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
