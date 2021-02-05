# Preval test case

# copy.md

> normalize > unique_assign > copy
>
> The normalization step should make it so that each binding is only assigned to once. It should create fresh bindings for every mutation.

#TODO

## Input

`````js filename=intro
let a = $(1);
while (a < 10) {
  a += 1;
  $(a);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = $(1);
while (true) {
  const tmpIfTest = a < 10;
  if (tmpIfTest) {
    a = a + 1;
    $(a);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = $(1);
while (true) {
  const tmpIfTest = a < 10;
  if (tmpIfTest) {
    a = a + 1;
    $(a);
  } else {
    break;
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 5
 - 6: 6
 - 7: 7
 - 8: 8
 - 9: 9
 - 10: 10
 - 11: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
