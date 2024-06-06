# Preval test case

# while_let_regex.md

> While > While let regex
>
> A regex is always truthy

#TODO

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
const tmpClusterSSA_x$1 = /foo/;
$(tmpClusterSSA_x$1);
const tmpClusterSSA_x$2 = /foo/;
$(tmpClusterSSA_x$2);
const tmpClusterSSA_x$3 = /foo/;
$(tmpClusterSSA_x$3);
const tmpClusterSSA_x$4 = /foo/;
$(tmpClusterSSA_x$4);
const tmpClusterSSA_x$5 = /foo/;
$(tmpClusterSSA_x$5);
const tmpClusterSSA_x$6 = /foo/;
$(tmpClusterSSA_x$6);
const tmpClusterSSA_x$7 = /foo/;
$(tmpClusterSSA_x$7);
const tmpClusterSSA_x$8 = /foo/;
$(tmpClusterSSA_x$8);
const tmpClusterSSA_x$9 = /foo/;
$(tmpClusterSSA_x$9);
const tmpClusterSSA_x$10 = /foo/;
$(tmpClusterSSA_x$10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpClusterSSA_x$11 = /foo/;
  $(tmpClusterSSA_x$11);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = /foo/;
$( a );
const b = /foo/;
$( b );
const c = /foo/;
$( c );
const d = /foo/;
$( d );
const e = /foo/;
$( e );
const f = /foo/;
$( f );
const g = /foo/;
$( g );
const h = /foo/;
$( h );
const i = /foo/;
$( i );
const j = /foo/;
$( j );
const k = /foo/;
$( k );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const l = /foo/;
  $( l );
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
