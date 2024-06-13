# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let { a } = { a: 999, b: 1000 };
  ({ a } = $({ a: 1, b: 2 }));
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let { a: a } = { a: 999, b: 1000 };
  ({ a: a } = $({ a: 1, b: 2 }));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let bindingPatternObjRoot = { a: 999, b: 1000 };
  let a = bindingPatternObjRoot.a;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  a = tmpAssignObjPatternRhs.a;
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam = { a: 1, b: 2 };
const tmpAssignObjPatternRhs = $(tmpCalleeParam);
const tmpClusterSSA_a = tmpAssignObjPatternRhs.a;
$(tmpClusterSSA_a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( a );
const c = b.a;
$( c );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
