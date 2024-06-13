# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$("c")]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = $(b)[$(`c`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
const b = { c: 1 };
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
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
const c = { c: 1 };
if (b) {
  const d = $( 100 );
  $( d );
}
else {
  const e = $( c );
  const f = $( "c" );
  const g = e[ f ];
  a = g;
  $( g );
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1
 - 5: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
