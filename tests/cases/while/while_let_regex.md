# Preval test case

# while_let_regex.md

> While > While let regex
>
> A regex is always truthy

## Input

`````js filename=intro
let x = /foo/; 
while (x) {
  $(x = /foo/);
}
`````

## Pre Normal


`````js filename=intro
let x = /foo/;
while (x) {
  $((x = /foo/));
}
`````

## Normalized


`````js filename=intro
let x = /foo/;
while (true) {
  if (x) {
    const tmpCallCallee = $;
    x = /foo/;
    let tmpCalleeParam = x;
    tmpCallCallee(tmpCalleeParam);
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const tmpClusterSSA_x = /foo/;
$(tmpClusterSSA_x);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x$1 = /foo/;
  $(tmpClusterSSA_x$1);
}
throw `[preval] unreachable; infinite loop`;
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
throw "[preval] unreachable; infinite loop";
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
