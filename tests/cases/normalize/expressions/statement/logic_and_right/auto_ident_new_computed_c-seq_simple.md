# Preval test case

# auto_ident_new_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Logic and right > Auto ident new computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) && new (1, 2, $(b))["$"](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(100) && new (1, 2, $(b))[`\$`](1);
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
const tmpIfTest /*:unknown*/ = $(100);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  new tmpNewCallee(1);
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = c.$;
  new d( 1 );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
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
