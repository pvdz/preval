# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$("c")]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[$(`c`)]));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
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
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
const b /*:object*/ = { c: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpCompProp /*:unknown*/ = $(`c`);
  const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj[tmpCompProp];
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
const b = $( 100 );
const c = { c: 1 };
if (b) {
  $( b );
}
else {
  const d = $( c );
  const e = $( "c" );
  const f = d[ e ];
  a = f;
  $( f );
}
$( a, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
