# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b).$(1) && $(b).$(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(b).$(1) && $(b).$(1);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpIfTest = tmpCallObj.$(1);
if (tmpIfTest) {
  const tmpCallObj$1 = $(b);
  tmpCallObj$1.$(1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpIfTest = tmpCallObj.$(1);
if (tmpIfTest) {
  const tmpCallObj$1 = $(b);
  tmpCallObj$1.$(1);
} else {
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
const c = $( a );
const d = c.$( 1 );
if (d) {
  const e = $( a );
  e.$( 1 );
}
$( b );
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
