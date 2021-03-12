# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > For in right > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = (1, 2, b)[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
for (let x in (a = (1, 2, b)[$('c')]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpAssignRhsCompProp = $('c');
const SSA_a = b[tmpAssignRhsCompProp];
let x;
for (x in SSA_a) {
}
$(SSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
