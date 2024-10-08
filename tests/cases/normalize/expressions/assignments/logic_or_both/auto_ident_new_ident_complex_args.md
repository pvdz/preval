# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) || (a = new $($(1), $(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new $($(1), $(2))) || (a = new $($(1), $(2))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = $;
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
a = new tmpNewCallee(tmpCalleeParam$1, tmpCalleeParam$3);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNewCallee$1 = $;
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs = new tmpNewCallee$1(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(1);
const tmpCalleeParam$3 = $(2);
let a = new $(tmpCalleeParam$1, tmpCalleeParam$3);
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$5 = $(1);
  const tmpCalleeParam$7 = $(2);
  const tmpNestedComplexRhs /*:object*/ = new $(tmpCalleeParam$5, tmpCalleeParam$7);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = new $( a, b );
const d = c;
if (c) {
  $( d );
}
else {
  const e = $( 1 );
  const f = $( 2 );
  const g = new $( e, f );
  c = g;
  $( g );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: {}
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
