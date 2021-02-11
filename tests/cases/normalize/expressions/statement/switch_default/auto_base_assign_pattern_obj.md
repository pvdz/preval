# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > switch_default > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    ({ b } = $({ b: $(2) }));
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpAssignObjPatternRhs.b;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
