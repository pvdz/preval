# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident nested simple member assigns
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$($(100) && (a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = 3;
let a = { a: 999, b: 1000 };
$($(100) && (a = b.x = b.x = b.x = b.x = b.x = b.x = c));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const varInitAssignLhsComputedRhs$9 = c;
  b.x = varInitAssignLhsComputedRhs$9;
  const varInitAssignLhsComputedRhs$7 = varInitAssignLhsComputedRhs$9;
  b.x = varInitAssignLhsComputedRhs$7;
  const varInitAssignLhsComputedRhs$5 = varInitAssignLhsComputedRhs$7;
  b.x = varInitAssignLhsComputedRhs$5;
  const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
  b.x = varInitAssignLhsComputedRhs$3;
  const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
  b.x = varInitAssignLhsComputedRhs$1;
  const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
  b.x = varInitAssignLhsComputedRhs;
  const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { x: 1 };
if (tmpCalleeParam) {
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  b.x = 3;
  a = 3;
  $(3);
} else {
  $(tmpCalleeParam);
}
$(a, b, 3);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
const c = { x: 1 };
if (b) {
  c.x = 3;
  c.x = 3;
  c.x = 3;
  c.x = 3;
  c.x = 3;
  c.x = 3;
  a = 3;
  $( 3 );
}
else {
  $( b );
}
$( a, c, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
