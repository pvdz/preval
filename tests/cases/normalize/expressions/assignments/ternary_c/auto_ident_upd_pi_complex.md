# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident upd pi complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = ++$($(b)).x));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = ++$($(b)).x));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(b);
  const varInitAssignLhsComputedObj = tmpCallCallee$1(tmpCalleeParam$1);
  const tmpBinLhs = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs = tmpBinLhs + 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(b);
  const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpCalleeParam$1);
  const tmpBinLhs /*:unknown*/ = varInitAssignLhsComputedObj.x;
  const varInitAssignLhsComputedRhs /*:primitive*/ = tmpBinLhs + 1;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  a = varInitAssignLhsComputedRhs;
  $(varInitAssignLhsComputedRhs);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 0 );
const c = { x: 1 };
if (b) {
  const d = $( 100 );
  $( d );
}
else {
  const e = $( c );
  const f = $( e );
  const g = f.x;
  const h = g + 1;
  f.x = h;
  a = h;
  $( h );
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: 2
 - 5: 2, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
