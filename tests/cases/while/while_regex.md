# Preval test case

# while_regex.md

> While > While regex
>
> A regex is always truthy

#TODO

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
const x$1 = /foo/;
$(x$1);
const x$2 = /foo/;
$(x$2);
const x$3 = /foo/;
$(x$3);
const x$4 = /foo/;
$(x$4);
const x$5 = /foo/;
$(x$5);
const x$6 = /foo/;
$(x$6);
const x$7 = /foo/;
$(x$7);
const x$8 = /foo/;
$(x$8);
const x$9 = /foo/;
$(x$9);
const x$10 = /foo/;
$(x$10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x$11 = /foo/;
  $(x$11);
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
