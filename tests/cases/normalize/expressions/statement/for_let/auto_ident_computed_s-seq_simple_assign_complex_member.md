# Preval test case

# auto_ident_computed_s-seq_simple_assign_complex_member.md

> Normalize > Expressions > Statement > For let > Auto ident computed s-seq simple assign complex member
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
for (let xyz = ((1, 2, b)[$("c")] = $(b)[$("d")]); ; $(1)) $(xyz);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
{
  let xyz = ((1, 2, b)[$(`c`)] = $(b)[$(`d`)]);
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const varInitAssignLhsComputedObj = b;
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
let xyz = varInitAssignLhsComputedRhs;
while (true) {
  $(xyz);
  $(1);
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 10, d: 20 };
const a = { a: 999, b: 1000 };
const varInitAssignLhsComputedProp = $(`c`);
const tmpCompObj = $(b);
const tmpCompProp = $(`d`);
const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
$(varInitAssignLhsComputedRhs);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(varInitAssignLhsComputedRhs);
  $(1);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
c: 10,
d: 20
;
const b = {
a: 999,
b: 1000
;
const c = $( "c" );
const d = $( a );
const e = $( "d" );
const f = d[ e ];
a[c] = f;
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
$( f );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( f );
  $( 1 );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: 20
 - 5: 1
 - 6: 20
 - 7: 1
 - 8: 20
 - 9: 1
 - 10: 20
 - 11: 1
 - 12: 20
 - 13: 1
 - 14: 20
 - 15: 1
 - 16: 20
 - 17: 1
 - 18: 20
 - 19: 1
 - 20: 20
 - 21: 1
 - 22: 20
 - 23: 1
 - 24: 20
 - 25: 1
 - 26: 20
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
