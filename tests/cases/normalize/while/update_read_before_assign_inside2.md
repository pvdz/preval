# Preval test case

# update_read_before_assign_inside2.md

> Normalize > While > Update read before assign inside2
>
> Testing SSA algo which must be aware that updating a binding in a loop may still be read by the next iteration

#TODO

## Input

`````js filename=intro
let x = true;
while (true) {
  $(x);
  x = 2; 
}
$('unreachable');
`````

## Pre Normal

`````js filename=intro
let x = true;
while (true) {
  $(x);
  x = 2;
}
$(`unreachable`);
`````

## Normalized

`````js filename=intro
let x = true;
while (true) {
  $(x);
  x = 2;
}
$(`unreachable`);
`````

## Output

`````js filename=intro
$(true);
$(2);
$(2);
$(2);
$(2);
$(2);
$(2);
$(2);
$(2);
$(2);
$(2);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(2);
}
$(`unreachable`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - 11: 2
 - 12: 2
 - 13: 2
 - 14: 2
 - 15: 2
 - 16: 2
 - 17: 2
 - 18: 2
 - 19: 2
 - 20: 2
 - 21: 2
 - 22: 2
 - 23: 2
 - 24: 2
 - 25: 2
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
