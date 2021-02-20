# Preval test case

# write_loop_loop_write_loop_write_read.md

> Assigns > Write loop loop write loop write read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    if ($(true)) break
  }
  x = $(30);
}
$(x);
`````

## Normalized

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    }
  }
  x = $(30);
}
$(x);
`````

## Output

`````js filename=intro
let x = $(10);
while (true) {
  while (true) {
    x = $(20);
    const tmpIfTest = $(true);
    if (tmpIfTest) {
      break;
    }
  }
  x = $(30);
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: true
 - 4: 30
 - 5: 20
 - 6: true
 - 7: 30
 - 8: 20
 - 9: true
 - 10: 30
 - 11: 20
 - 12: true
 - 13: 30
 - 14: 20
 - 15: true
 - 16: 30
 - 17: 20
 - 18: true
 - 19: 30
 - 20: 20
 - 21: true
 - 22: 30
 - 23: 20
 - 24: true
 - 25: 30
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
