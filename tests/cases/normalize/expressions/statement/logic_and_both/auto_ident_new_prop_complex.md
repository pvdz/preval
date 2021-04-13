# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident new prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new ($(b).$)(1) && new ($(b).$)(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
new ($(b).$)(1) && new ($(b).$)(1);
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
  const tmpCompObj$1 = $(b);
  const tmpNewCallee$1 = tmpCompObj$1.$;
  new tmpNewCallee$1(1);
} else {
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
const tmpIfTest = new tmpNewCallee(1);
if (tmpIfTest) {
  const tmpCompObj$1 = $(b);
  const tmpNewCallee$1 = tmpCompObj$1.$;
  new tmpNewCallee$1(1);
} else {
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
