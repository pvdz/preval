# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > For let > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = delete arg[$("y")]; ; $(1)) $(xyz);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = delete arg[$(`y`)];
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
const tmpDeleteCompObj = arg;
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
const a = { a: 999, b: 1000 };
const tmpDeleteCompProp = $(`y`);
const xyz = delete arg[tmpDeleteCompProp];
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
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( "y" );
const d = deletea[ c ];
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
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: true
 - 3: 1
 - 4: true
 - 5: 1
 - 6: true
 - 7: 1
 - 8: true
 - 9: 1
 - 10: true
 - 11: 1
 - 12: true
 - 13: 1
 - 14: true
 - 15: 1
 - 16: true
 - 17: 1
 - 18: true
 - 19: 1
 - 20: true
 - 21: 1
 - 22: true
 - 23: 1
 - 24: true
 - 25: 1
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
