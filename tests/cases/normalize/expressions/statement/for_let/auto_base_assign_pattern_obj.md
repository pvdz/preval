# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > for_let > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
for (let xyz = ({ b } = $({ b: $(2) })); ; $(1)) $(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
let xyz;
const tmpCallCallee = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
b = tmpNestedAssignObjPatternRhs.b;
xyz = tmpNestedAssignObjPatternRhs;
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
while (true) {
  $(tmpNestedAssignObjPatternRhs);
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
