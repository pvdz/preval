# Preval test case

# auto_ident_new_computed_simple_complex2.md

> Normalize > Expressions > Statement > Ternary b > Auto ident new computed simple complex2
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
const b = { $: $ };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = b[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Pre Normal


`````js filename=intro
const b = { $: $ };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = b[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Normalized


`````js filename=intro
const b = { $: $ };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = b[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCompProp = $(`\$`);
  const b /*:object*/ = { $: $ };
  const tmpNewCallee = b[tmpCompProp];
  new tmpNewCallee(1);
} else {
  $(200);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( "$" );
  const c = { $: $ };
  const d = c[ b ];
  new d( 1 );
}
else {
  $( 200 );
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
 - 1: 1
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same