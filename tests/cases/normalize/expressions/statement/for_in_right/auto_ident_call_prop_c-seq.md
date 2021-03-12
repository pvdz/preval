# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Statement > For in right > Auto ident call prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let x in (1, 2, $(b)).$(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
for (let x in (1, 2, $(b)).$(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpForInDeclRhs = tmpCallObj.$(1);
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpForInDeclRhs = tmpCallObj.$(1);
let x;
for (x in tmpForInDeclRhs) {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
