# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Statement > Ternary b > Auto ident new computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(1) ? new ($(b)["$"])(1) : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(1) ? new ($(b)['$'])(1) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const b = { $: $ };
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
