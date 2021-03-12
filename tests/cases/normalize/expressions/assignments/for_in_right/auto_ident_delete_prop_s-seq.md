# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Assignments > For in right > Auto ident delete prop s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let x in (a = delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
for (let x in (a = delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
a = delete tmpDeleteObj.y;
let tmpForInDeclRhs = a;
let x;
for (x in tmpForInDeclRhs) {
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
$(1);
$(2);
const SSA_a = delete arg.y;
let x;
for (x in SSA_a) {
}
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
