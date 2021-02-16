# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > for_let > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (let xyz = (a = { b } = $({ b: $(2) })); ; $(1)) $(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = $(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
a = tmpNestedAssignObjPatternRhs;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }
 - 4: 1
 - 5: { b: '2' }
 - 6: 1
 - 7: { b: '2' }
 - 8: 1
 - 9: { b: '2' }
 - 10: 1
 - 11: { b: '2' }
 - 12: 1
 - 13: { b: '2' }
 - 14: 1
 - 15: { b: '2' }
 - 16: 1
 - 17: { b: '2' }
 - 18: 1
 - 19: { b: '2' }
 - 20: 1
 - 21: { b: '2' }
 - 22: 1
 - 23: { b: '2' }
 - 24: 1
 - 25: { b: '2' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
