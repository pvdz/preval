# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Stmt func block > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = {};

    let a = { a: 999, b: 1000 };
    ({ b } = $({ b: $(2) }));
    $(a, b);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = {};
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  $(a, b);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = $(tmpCalleeParam);
  const SSA_b = tmpAssignObjPatternRhs.b;
  $(a, SSA_b);
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { a: '999', b: '1000' }, 2
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
