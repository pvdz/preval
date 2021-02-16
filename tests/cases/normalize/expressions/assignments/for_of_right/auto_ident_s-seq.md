# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > assignments > for_of_right > auto_ident_s-seq
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

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = x_1;
let tmpForOfDeclRhs = a;
let x_1;
for (x_1 of tmpForOfDeclRhs) {
}
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(2);
a = x_1;
let tmpForOfDeclRhs = a;
let x_1;
for (x_1 of tmpForOfDeclRhs) {
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
