# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > Logic and right > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(100) && (a = b = $(2)));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$($(100) && (a = b = $(2)));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  b = $(2);
  let tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  b = $(2);
  const tmpNestedComplexRhs = b;
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = {
a: 999,
b: 1000
;
const c = $( 100 );
if (c) {
  a = $( 2 );
  const d = a;
  b = d;
  $( d );
}
else {
  $( c );
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: 2
 - 4: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
