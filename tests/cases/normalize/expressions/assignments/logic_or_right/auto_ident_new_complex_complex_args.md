# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) || (a = new ($($))($(1), $(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(100) || (a = new ($($))($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = $(100);
if (tmpCalleeParam) {
} else {
  const tmpNewCallee = $($);
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$3 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  const tmpNewCallee /*:unknown*/ = $($);
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 100 );
if (b) {
  $( b );
}
else {
  const c = $( $ );
  const d = $( 1 );
  const e = $( 2 );
  const f = new c( d, e );
  a = f;
  $( f );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
