# Preval test case

# auto_prop_complex_simple.md

> normalize > expressions > assignments > for_let > auto_prop_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = { b: $(1) }); ; $(1)) $(xyz);
$(a).b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let xyz = a;
  while (true) {
    $(xyz);
    $(1);
  }
}
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 1
 - 4: { b: '1' }
 - 5: 1
 - 6: { b: '1' }
 - 7: 1
 - 8: { b: '1' }
 - 9: 1
 - 10: { b: '1' }
 - 11: 1
 - 12: { b: '1' }
 - 13: 1
 - 14: { b: '1' }
 - 15: 1
 - 16: { b: '1' }
 - 17: 1
 - 18: { b: '1' }
 - 19: 1
 - 20: { b: '1' }
 - 21: 1
 - 22: { b: '1' }
 - 23: 1
 - 24: { b: '1' }
 - 25: 1
 - 26: { b: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same