# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident new computed complex simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = new ($(b)["$"])(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = new ($(b)[`$`])(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
let a = new tmpNewCallee(1);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const a = new tmpNewCallee(1);
$(a);
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
