# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > For let > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = arguments); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = arguments);
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
a = arguments;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const a /*:unknown*/ = arguments;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = arguments;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

arguments

## Result

Should call `$` with:
 - 1: '<Global Arguments>'
 - 2: 1
 - 3: '<Global Arguments>'
 - 4: 1
 - 5: '<Global Arguments>'
 - 6: 1
 - 7: '<Global Arguments>'
 - 8: 1
 - 9: '<Global Arguments>'
 - 10: 1
 - 11: '<Global Arguments>'
 - 12: 1
 - 13: '<Global Arguments>'
 - 14: 1
 - 15: '<Global Arguments>'
 - 16: 1
 - 17: '<Global Arguments>'
 - 18: 1
 - 19: '<Global Arguments>'
 - 20: 1
 - 21: '<Global Arguments>'
 - 22: 1
 - 23: '<Global Arguments>'
 - 24: 1
 - 25: '<Global Arguments>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
