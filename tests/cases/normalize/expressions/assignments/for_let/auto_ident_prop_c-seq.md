# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Assignments > For let > Auto ident prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = (a = (1, 2, $(b)).c); ; $(1)) $(xyz);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = (1, 2, $(b)).c);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpAssignRhsProp = $(b);
a = tmpAssignRhsProp.c;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const b /*:object*/ = { c: 1 };
const tmpAssignRhsProp /*:unknown*/ = $(b);
const tmpClusterSSA_a /*:unknown*/ = tmpAssignRhsProp.c;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(tmpClusterSSA_a);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { c: 1 };
const b = $( a );
const c = b.c;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( c );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
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

Todos triggered:
- regular property access of an ident feels tricky;