# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > Return > Auto seq complex computed complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = { b: $(1) });
}
$(f());
($(1), $(a))[$("b")] = $(2);
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = { b: $(1) });
};
let a = { a: 999, b: 1000 };
$(f());
($(1), $(a))[$(`b`)] = $(2);
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  return a;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(1);
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $(`b`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const a /*:object*/ = { b: tmpObjLitVal };
$(a);
$(1);
const tmpAssignComMemLhsObj /*:unknown*/ = $(a);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`b`);
const tmpAssignComputedRhs /*:unknown*/ = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
$( 1 );
const c = $( b );
const d = $( "b" );
const e = $( 2 );
c[d] = e;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 1
 - 4: { b: '1' }
 - 5: 'b'
 - 6: 2
 - 7: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
