# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > For of right > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for (let x of (a = typeof x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
a = typeof x$1;
let tmpForOfDeclRhs = a;
let x$1;
for (x$1 of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
const SSA_a = typeof x$1;
let x$1;
for (x$1 of SSA_a) {
}
$(SSA_a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot access '<ref>' before initialization ]>")

Normalized calls: Same

Final output calls: Same
