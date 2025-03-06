# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Statement > For let > Auto ident arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = () => {}; ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = () => {
    debugger;
  };
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
let xyz = function () {
  debugger;
  return undefined;
};
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const xyz /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( a );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 1
 - 3: '<function>'
 - 4: 1
 - 5: '<function>'
 - 6: 1
 - 7: '<function>'
 - 8: 1
 - 9: '<function>'
 - 10: 1
 - 11: '<function>'
 - 12: 1
 - 13: '<function>'
 - 14: 1
 - 15: '<function>'
 - 16: 1
 - 17: '<function>'
 - 18: 1
 - 19: '<function>'
 - 20: 1
 - 21: '<function>'
 - 22: 1
 - 23: '<function>'
 - 24: 1
 - 25: '<function>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check