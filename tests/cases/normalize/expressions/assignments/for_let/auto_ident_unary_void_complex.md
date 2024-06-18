# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = void $(100)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = void $(100));
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
$(100);
a = undefined;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(undefined);
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( undefined );
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: 1
 - 4: undefined
 - 5: 1
 - 6: undefined
 - 7: 1
 - 8: undefined
 - 9: 1
 - 10: undefined
 - 11: 1
 - 12: undefined
 - 13: 1
 - 14: undefined
 - 15: 1
 - 16: undefined
 - 17: 1
 - 18: undefined
 - 19: 1
 - 20: undefined
 - 21: 1
 - 22: undefined
 - 23: 1
 - 24: undefined
 - 25: 1
 - 26: undefined
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
