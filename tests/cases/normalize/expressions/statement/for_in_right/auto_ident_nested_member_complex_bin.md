# Preval test case

# auto_ident_nested_member_complex_bin.md

> Normalize > Expressions > Statement > For in right > Auto ident nested member complex bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;

let a = { a: 999, b: 1000 };
for (let x in ($(b)[$("x")] = $(c)[$("y")] = d + e));
$(a, b, c, d, e);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 },
  c = { y: 2 },
  d = 3,
  e = 4;
let a = { a: 999, b: 1000 };
for (let x in ($(b)[$(`x`)] = $(c)[$(`y`)] = d + e));
$(a, b, c, d, e);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let c = { y: 2 };
let d = 3;
let e = 4;
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
const varInitAssignLhsComputedRhs$1 = d + e;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpForInDeclRhs = varInitAssignLhsComputedRhs;
let x = undefined;
for (x in tmpForInDeclRhs) {
}
$(a, b, c, d, e);
`````

## Output


`````js filename=intro
const b = { x: 1 };
const c = { y: 2 };
const a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = $(b);
const varInitAssignLhsComputedProp = $(`x`);
const varInitAssignLhsComputedObj$1 = $(c);
const varInitAssignLhsComputedProp$1 = $(`y`);
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = 7;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 7;
let x = undefined;
for (x in 7) {
}
$(a, b, c, 3, 4);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = { y: 2 };
const c = {
  a: 999,
  b: 1000,
};
const d = $( a );
const e = $( "x" );
const f = $( b );
const g = $( "y" );
f[g] = 7;
d[e] = 7;
let h = undefined;
for (h in 7) {

}
$( c, a, b, 3, 4 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { y: '2' }
 - 4: 'y'
 - 5: { a: '999', b: '1000' }, { x: '7' }, { y: '7' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
