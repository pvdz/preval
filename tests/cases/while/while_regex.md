# Preval test case

# while_regex.md

> While > While regex
>
> A regex is always truthy

## Input

`````js filename=intro
const x = /foo/; 
while (x) {
  $(x);
}
`````

## Pre Normal


`````js filename=intro
const x = /foo/;
while (x) {
  $(x);
}
`````

## Normalized


`````js filename=intro
const x = /foo/;
while (true) {
  if (x) {
    $(x);
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const x = /foo/;
$(x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x$1 = /foo/;
  $(x$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
$( a );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = /foo/;
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - 5: {}
 - 6: {}
 - 7: {}
 - 8: {}
 - 9: {}
 - 10: {}
 - 11: {}
 - 12: {}
 - 13: {}
 - 14: {}
 - 15: {}
 - 16: {}
 - 17: {}
 - 18: {}
 - 19: {}
 - 20: {}
 - 21: {}
 - 22: {}
 - 23: {}
 - 24: {}
 - 25: {}
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
