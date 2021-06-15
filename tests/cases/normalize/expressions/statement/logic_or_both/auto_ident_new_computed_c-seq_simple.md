# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic or both > Auto ident new computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new (1, 2, $(b))["$"](1) || new (1, 2, $(b))["$"](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new (1, 2, $(b))[`$`](1) || new (1, 2, $(b))[`$`](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
} else {
  const tmpCompObj$1 = $(b);
  const tmpNewCallee$1 = tmpCompObj$1.$;
  new tmpNewCallee$1(1);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
new tmpNewCallee(1);
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
