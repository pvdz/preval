# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(1) ? (a = delete ($(1), $(2), $(arg))[$("y")]) : $(200));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(1) ? (a = delete ($(1), $(2), $(arg))[$(`y`)]) : $(200));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
const arg = { y: 1 };
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = { y: 1 };
if (b) {
  $( 1 );
  $( 2 );
  const d = $( c );
  const e = $( "y" );
  const f = deleted[ e ];
  a = f;
  $( f );
}
else {
  const g = $( 200 );
  $( g );
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: true
 - 7: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
