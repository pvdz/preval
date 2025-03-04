# Preval test case

# auto_ident_delete_prop_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident delete prop complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) || (a = delete $(arg).y));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(100) || (a = delete $(arg).y));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpDeleteObj = $(arg);
  const tmpNestedComplexRhs = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
const arg /*:object*/ = { y: 1 };
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpDeleteObj /*:unknown*/ = $(arg);
  const tmpNestedComplexRhs /*:boolean*/ = delete tmpDeleteObj.y;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
const c = { y: 1 };
if (b) {
  $( b );
}
else {
  const d = $( c );
  const e = delete d.y;
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
 - 3: { a: '999', b: '1000' }, { y: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
