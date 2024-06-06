# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident new complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = new ($($))($(1), $(2))) : $(200));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1) ? (a = new ($($))($(1), $(2))) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpNewCallee = $($);
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$3 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpNewCallee = $($);
  const tmpCalleeParam$1 = $(1);
  const tmpCalleeParam$3 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam = $(200);
  $(tmpClusterSSA_tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
if (b) {
  const c = $( $ );
  const d = $( 1 );
  const e = $( 2 );
  const f = new c( d, e );
  a = f;
  $( f );
}
else {
  const g = $( 200 );
  $( g );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: {}
 - 7: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
