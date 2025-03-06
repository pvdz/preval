# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > For let > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = /foo/; ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = /foo/;
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
let xyz = /foo/;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const xyz /*:regex*/ = /foo/;
  $(xyz);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const a = /foo/;
  $( a );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: 1
 - 3: {}
 - 4: 1
 - 5: {}
 - 6: 1
 - 7: {}
 - 8: 1
 - 9: {}
 - 10: 1
 - 11: {}
 - 12: 1
 - 13: {}
 - 14: 1
 - 15: {}
 - 16: 1
 - 17: {}
 - 18: 1
 - 19: {}
 - 20: 1
 - 21: {}
 - 22: 1
 - 23: {}
 - 24: 1
 - 25: {}
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check