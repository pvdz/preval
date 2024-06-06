# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) || (a = $($)($(1), $(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = $($)($(1), $(2))) || (a = $($)($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$3 = $($);
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCallCallee$1 = $($);
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
let a = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpCallCallee$3 = $($);
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
let d = a( b, c );
const e = d;
if (d) {
  $( e );
}
else {
  const f = $( $ );
  const g = $( 1 );
  const h = $( 2 );
  const i = f( g, h );
  d = i;
  $( i );
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
