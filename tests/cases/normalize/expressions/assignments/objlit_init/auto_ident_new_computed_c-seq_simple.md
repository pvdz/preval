# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident new computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$({ x: (a = new (1, 2, $(b))["$"](1)) });
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$({ x: (a = new (1, 2, $(b))['$'](1)) });
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
a = new tmpNewCallee(1);
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const SSA_a = new tmpNewCallee(1);
const tmpCalleeParam = { x: SSA_a };
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { x: '{}' }
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
