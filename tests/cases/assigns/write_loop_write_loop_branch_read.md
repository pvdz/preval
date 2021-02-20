# Preval test case

# write_loop_write_loop_branch_read.md

> Assigns > Write loop write loop branch read
>
> Turning a var into a const. Or not.

#TODO

## Input

`````js filename=intro
let x = $(10);
while ($(x)) {
  x = $(0); // If this gets SSA'd then the loop won't stop
  if ($(true)) $(x, 'branch');
}
`````

## Normalized

`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = $(0);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x, 'branch');
    }
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let x = $(10);
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = $(0);
    const tmpIfTest$1 = $(true);
    if (tmpIfTest$1) {
      $(x, 'branch');
    }
  } else {
    break;
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - 3: 0
 - 4: true
 - 5: 0, 'branch'
 - 6: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
