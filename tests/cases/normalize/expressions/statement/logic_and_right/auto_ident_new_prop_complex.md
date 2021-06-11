# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident new prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) && new ($(b).$)(1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(100) && new ($(b).$)(1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
} else {
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(100);
if (tmpIfTest) {
  const b = { $: $ };
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
