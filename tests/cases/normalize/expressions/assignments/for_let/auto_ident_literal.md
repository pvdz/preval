# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > For let > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = "foo"); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = `foo`);
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
a = `foo`;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(`foo`);
  $(1);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( "foo" );
  $( 1 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 1
 - 3: 'foo'
 - 4: 1
 - 5: 'foo'
 - 6: 1
 - 7: 'foo'
 - 8: 1
 - 9: 'foo'
 - 10: 1
 - 11: 'foo'
 - 12: 1
 - 13: 'foo'
 - 14: 1
 - 15: 'foo'
 - 16: 1
 - 17: 'foo'
 - 18: 1
 - 19: 'foo'
 - 20: 1
 - 21: 'foo'
 - 22: 1
 - 23: 'foo'
 - 24: 1
 - 25: 'foo'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
