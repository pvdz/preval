# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > For let > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (let xyz = (a = delete ($(1), $(2), $(arg)).y); ; $(1)) $(xyz);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let xyz = (a = delete ($(1), $(2), $(arg)).y);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
$(1);
$(2);
const tmpDeleteObj = $(arg);
const tmpClusterSSA_a = delete tmpDeleteObj.y;
while (true) {
  $(tmpClusterSSA_a);
  $(1);
}
$(tmpClusterSSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: true
 - 5: 1
 - 6: true
 - 7: 1
 - 8: true
 - 9: 1
 - 10: true
 - 11: 1
 - 12: true
 - 13: 1
 - 14: true
 - 15: 1
 - 16: true
 - 17: 1
 - 18: true
 - 19: 1
 - 20: true
 - 21: 1
 - 22: true
 - 23: 1
 - 24: true
 - 25: 1
 - 26: true
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
