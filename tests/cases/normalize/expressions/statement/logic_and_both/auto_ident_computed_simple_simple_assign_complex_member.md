# Preval test case

# auto_ident_computed_simple_simple_assign_complex_member.md

> Normalize > Expressions > Statement > Logic and both > Auto ident computed simple simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
(b["c"] = $(b)[$("d")]) && (b["c"] = $(b)[$("d")]);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
(b[`c`] = $(b)[$(`d`)]) && (b[`c`] = $(b)[$(`d`)]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
const tmpIfTest = varInitAssignLhsComputedRhs;
if (tmpIfTest) {
  const tmpAssignMemLhsObj = b;
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`d`);
  const tmpAssignMemRhs = tmpCompObj$1[tmpCompProp$1];
  tmpAssignMemLhsObj.c = tmpAssignMemRhs;
} else {
}
$(a, b);
`````

## Output


`````js filename=intro
const b /*:object*/ = { c: 10, d: 20 };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`d`);
const varInitAssignLhsComputedRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
b.c = varInitAssignLhsComputedRhs;
if (varInitAssignLhsComputedRhs) {
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`d`);
  const tmpAssignMemRhs /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  b.c = tmpAssignMemRhs;
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  c: 10,
  d: 20,
};
const b = $( a );
const c = $( "d" );
const d = b[ c ];
a.c = d;
if (d) {
  const e = $( a );
  const f = $( "d" );
  const g = e[ f ];
  a.c = g;
}
const h = {
  a: 999,
  b: 1000,
};
$( h, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: { c: '20', d: '20' }
 - 4: 'd'
 - 5: 
  { a: '999', b: '1000' },
  { c: '20', d: '20' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
