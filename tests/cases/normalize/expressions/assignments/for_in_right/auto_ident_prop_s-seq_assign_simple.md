# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident prop s-seq assign simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = (1, 2, b).c = 2));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
for (let x in (a = (1, 2, b).c = 2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
b.c = 2;
let x;
for (x in 2) {
}
$(2, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
