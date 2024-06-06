# Preval test case

# auto_ident_call_computed_simple_simple.md

> Normalize > Expressions > Statement > Ternary a > Auto ident call computed simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b["$"](1) ? $(100) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
b[`\$`](1) ? $(100) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = b.$(1);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpIfTest = b.$(1);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
a: 999,
b: 1000
;
const c = a.$( 1 );
if (c) {
  $( 100 );
}
else {
  $( 200 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
