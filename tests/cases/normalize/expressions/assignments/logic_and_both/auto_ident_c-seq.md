# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) && (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = ($(1), $(2), $(x))) && (a = ($(1), $(2), $(x))));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
a = $(x);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  $(1);
  $(2);
  const tmpNestedComplexRhs = $(x);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output


`````js filename=intro
$(1);
$(2);
let a /*:unknown*/ = $(1);
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  $(1);
  $(2);
  const tmpNestedComplexRhs /*:unknown*/ = $(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
let a = $( 1 );
const b = a;
if (a) {
  $( 1 );
  $( 2 );
  const c = $( 1 );
  a = c;
  $( c );
}
else {
  $( b );
}
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 1
 - 8: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
