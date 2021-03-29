# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident new prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
(a = new ($(b).$)(1))["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
let obj = {};
(a = new ($(b).$)(1))['a'];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
a = new tmpNewCallee(1);
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj$1 = $(b);
const tmpNewCallee = tmpCompObj$1.$;
const tmpSSA_a = new tmpNewCallee(1);
tmpSSA_a.a;
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
