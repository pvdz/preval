# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
b.$(1) && b.$(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
b.$(1) && b.$(1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = b.$(1);
if (tmpIfTest) {
  b.$(1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpIfTest = b.$(1);
if (tmpIfTest) {
  b.$(1);
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
if (b) {
  a.$( 1 );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
