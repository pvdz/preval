# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > For let > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (let xyz = (1, 2, b)[$("$")](1); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let xyz = (1, 2, b)[$(`\$`)](1);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
let xyz = tmpCallCompObj[tmpCallCompProp](1);
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompProp = $(`\$`);
const xyz = b[tmpCallCompProp](1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
$(xyz);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
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
const c = $( "$" );
const d = a[ c ]( 1 )};
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
$( d );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( d );
  $( 1 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
