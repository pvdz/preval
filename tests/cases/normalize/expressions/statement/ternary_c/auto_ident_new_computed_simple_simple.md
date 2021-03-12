# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Statement > Ternary c > Auto ident new computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : new b["$"](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : new b['$'](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpNewCallee = b.$;
  new tmpNewCallee(1);
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const tmpNewCallee = b.$;
  new tmpNewCallee(1);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
