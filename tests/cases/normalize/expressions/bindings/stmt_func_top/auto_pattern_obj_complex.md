# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto pattern obj complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let { a } = $({ a: 1, b: 2 });
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let { a: a } = $({ a: 1, b: 2 });
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = { a: 1, b: 2 };
  let bindingPatternObjRoot = $(tmpCalleeParam);
  let a = bindingPatternObjRoot.a;
  $(a);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const bindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const a /*:unknown*/ = bindingPatternObjRoot.a;
$(a);
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
