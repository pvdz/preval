# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Ternary c > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(b)[$("$")](1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(0) ? $(100) : $(b)[$(`\$`)](1);
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
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  tmpCallCompObj[tmpCallCompProp](1);
}
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
} else {
  const b = { $: $ };
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  tmpCallCompObj[tmpCallCompProp](1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 100 );
}
else {
  const b = { $: $ };
  const c = $( b );
  const d = $( "$" );
  c[ d ]( 1 );
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
 - 1: 0
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
