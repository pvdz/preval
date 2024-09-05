# Preval test case

# auto_base_assign_pattern_obj.md

> Normalize > Expressions > Statement > Stmt func block > Auto base assign pattern obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

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

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let b = {};
    let a = { a: 999, b: 1000 };
    ({ b: b } = $({ b: $(2) }));
    $(a, b);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = {};
  let a = { a: 999, b: 1000 };
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  $(a, b);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(2);
const tmpCalleeParam = { b: tmpObjLitVal };
const tmpAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_b = tmpAssignObjPatternRhs.b;
const a = { a: 999, b: 1000 };
$(a, tmpClusterSSA_b);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = { b: a };
const c = $( b );
const d = c.b;
const e = {
  a: 999,
  b: 1000,
};
$( e, d );
$( undefined );
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
