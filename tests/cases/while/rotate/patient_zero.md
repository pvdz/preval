# Preval test case

# patient_zero.md

> While > Rotate > Patient zero
>
> Rotating statements in an infinite loop

## Input

`````js filename=intro
let x = /foo/;
x.foo = `object`; // Move this inside the while
while ($LOOP_UNROLL_10) {
  const tmp = x.foo;
  $(tmp);
  x = /foo/;
  x.foo = `object`; // Rotate this line ^^
}
`````

## Pre Normal


`````js filename=intro
let x = /foo/;
x.foo = `object`;
while ($LOOP_UNROLL_10) {
  const tmp = x.foo;
  $(tmp);
  x = /foo/;
  x.foo = `object`;
}
`````

## Normalized


`````js filename=intro
let x = /foo/;
x.foo = `object`;
while ($LOOP_UNROLL_10) {
  const tmp = x.foo;
  $(tmp);
  x = /foo/;
  x.foo = `object`;
}
`````

## Output


`````js filename=intro
let x = /foo/;
x.foo = `object`;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmp = x.foo;
  $(tmp);
  x = /foo/;
  x.foo = `object`;
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = /foo/;
a.foo = "object";
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a.foo;
  $( b );
  a = /foo/;
  a.foo = "object";
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'object'
 - 2: 'object'
 - 3: 'object'
 - 4: 'object'
 - 5: 'object'
 - 6: 'object'
 - 7: 'object'
 - 8: 'object'
 - 9: 'object'
 - 10: 'object'
 - 11: 'object'
 - 12: 'object'
 - 13: 'object'
 - 14: 'object'
 - 15: 'object'
 - 16: 'object'
 - 17: 'object'
 - 18: 'object'
 - 19: 'object'
 - 20: 'object'
 - 21: 'object'
 - 22: 'object'
 - 23: 'object'
 - 24: 'object'
 - 25: 'object'
 - 26: 'object'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
