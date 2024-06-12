# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > For let > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = delete $(arg)[$("y")]; ; $(1)) $(xyz);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = delete $(arg)[$(`y`)];
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
let xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
while (true) {
  $(xyz);
  $(1);
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
const xyz = delete tmpDeleteCompObj[tmpDeleteCompProp];
$(xyz);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = deleteb[ c ];
$( d );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( d );
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: true
 - 4: 1
 - 5: true
 - 6: 1
 - 7: true
 - 8: 1
 - 9: true
 - 10: 1
 - 11: true
 - 12: 1
 - 13: true
 - 14: 1
 - 15: true
 - 16: 1
 - 17: true
 - 18: 1
 - 19: true
 - 20: 1
 - 21: true
 - 22: 1
 - 23: true
 - 24: 1
 - 25: true
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
