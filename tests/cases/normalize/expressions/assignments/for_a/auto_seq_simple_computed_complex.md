# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > For a > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (a = { b: $(1) }; ; $(1));
($(1), a)[$("b")] = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = { b: $(1) };
  while (true) {
    $(1);
  }
}
($(1), a)[$(`b`)] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
while (true) {
  $(1);
}
$(1);
const tmpAssignComMemLhsObj = a;
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
}
$(1);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
const a = { b: tmpObjLitVal };
a[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
}
$( 1 );
const b = $( "b" );
const c = $( 2 );
const d = { b: a };
d[b] = c;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
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
