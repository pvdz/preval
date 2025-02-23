# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident upd ip complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$((a = $($(b)).x++) || (a = $($(b)).x++));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$((a = $($(b)).x++) || (a = $($(b)).x++));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(b);
const tmpPostUpdArgObj = tmpCallCallee$1(tmpCalleeParam$1);
const tmpPostUpdArgVal = tmpPostUpdArgObj.x;
const tmpAssignMemLhsObj = tmpPostUpdArgObj;
const tmpAssignMemRhs = tmpPostUpdArgVal + 1;
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
a = tmpPostUpdArgVal;
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(b);
  const tmpPostUpdArgObj$1 = tmpCallCallee$3(tmpCalleeParam$3);
  const tmpPostUpdArgVal$1 = tmpPostUpdArgObj$1.x;
  const tmpAssignMemLhsObj$1 = tmpPostUpdArgObj$1;
  const tmpAssignMemRhs$1 = tmpPostUpdArgVal$1 + 1;
  tmpAssignMemLhsObj$1.x = tmpAssignMemRhs$1;
  const tmpNestedComplexRhs = tmpPostUpdArgVal$1;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam$1 /*:unknown*/ = $(b);
const tmpPostUpdArgObj /*:unknown*/ = $(tmpCalleeParam$1);
const tmpPostUpdArgVal /*:unknown*/ = tmpPostUpdArgObj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpPostUpdArgVal + 1;
tmpPostUpdArgObj.x = tmpAssignMemRhs;
let tmpClusterSSA_a /*:unknown*/ = tmpPostUpdArgVal;
if (tmpPostUpdArgVal) {
  $(tmpPostUpdArgVal);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(b);
  const tmpPostUpdArgObj$1 /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpPostUpdArgVal$1 /*:unknown*/ = tmpPostUpdArgObj$1.x;
  const tmpAssignMemRhs$1 /*:primitive*/ = tmpPostUpdArgVal$1 + 1;
  tmpPostUpdArgObj$1.x = tmpAssignMemRhs$1;
  tmpClusterSSA_a = tmpPostUpdArgVal$1;
  $(tmpPostUpdArgVal$1);
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = d + 1;
c.x = e;
let f = d;
if (d) {
  $( d );
}
else {
  const g = $( a );
  const h = $( g );
  const i = h.x;
  const j = i + 1;
  h.x = j;
  f = i;
  $( i );
}
$( f, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1
 - 4: 1, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
