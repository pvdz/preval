# Preval test case

# auto_seq_simple_computed_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto seq simple computed complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), a)[$("b")] = $(2);
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), a)[$(`b`)] = $(2);
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpCallCallee = a;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = a;
  const tmpAssignComMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignComMemLhsProp = $(`b`);
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpAssignComputedRhs = $(2);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = f();
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
const tmpCalleeParam = $(1);
const a = { b: tmpObjLitVal };
const tmpAssignComMemLhsObj = a(tmpCalleeParam, a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = { b: a };
const d = c( b, c );
const e = $( "b" );
const f = $( 2 );
d[e] = f;
$( c );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
