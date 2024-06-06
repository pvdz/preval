# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)["c"]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)[`c`]));
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
  const tmpNestedComplexRhs = tmpCompObj.c;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
const b = { c: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpCompObj = $(b);
  const tmpNestedComplexRhs = tmpCompObj.c;
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
b: 1000
;
const b = $( 100 );
const c = { c: 1 };
if (b) {
  $( b );
}
else {
  const d = $( c );
  const e = d.c;
  a = e;
  $( e );
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
