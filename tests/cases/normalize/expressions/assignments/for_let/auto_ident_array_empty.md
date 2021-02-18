# Preval test case

# auto_ident_array_empty.md

> normalize > expressions > assignments > for_let > auto_ident_array_empty
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = []); ; $(1)) $(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = [];
while (true) {
  $(SSA_a);
  $(1);
}
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: 1
 - 3: []
 - 4: 1
 - 5: []
 - 6: 1
 - 7: []
 - 8: 1
 - 9: []
 - 10: 1
 - 11: []
 - 12: 1
 - 13: []
 - 14: 1
 - 15: []
 - 16: 1
 - 17: []
 - 18: 1
 - 19: []
 - 20: 1
 - 21: []
 - 22: 1
 - 23: []
 - 24: 1
 - 25: []
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
