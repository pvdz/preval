# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > For let > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = [$(1), 2, $(3)]; ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = [$(1), 2, $(3)];
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
let xyz = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const xyz = [tmpArrElement, 2, tmpArrElement$3];
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
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( 3 );
const d = [ b, 2, c,, ];
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
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: [1, 2, 3]
 - 4: 1
 - 5: [1, 2, 3]
 - 6: 1
 - 7: [1, 2, 3]
 - 8: 1
 - 9: [1, 2, 3]
 - 10: 1
 - 11: [1, 2, 3]
 - 12: 1
 - 13: [1, 2, 3]
 - 14: 1
 - 15: [1, 2, 3]
 - 16: 1
 - 17: [1, 2, 3]
 - 18: 1
 - 19: [1, 2, 3]
 - 20: 1
 - 21: [1, 2, 3]
 - 22: 1
 - 23: [1, 2, 3]
 - 24: 1
 - 25: [1, 2, 3]
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
