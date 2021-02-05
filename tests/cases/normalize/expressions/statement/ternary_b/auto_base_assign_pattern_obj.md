# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > ternary_b > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(1) ? ({ b } = $({ b: $(2) })) : $(200);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  tmpAssignObjPatternRhs;
} else {
  $(200);
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
} else {
  $(200);
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
