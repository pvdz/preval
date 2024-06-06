# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = b.$(1)) || (a = b.$(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = b.$(1)) || (a = b.$(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = b.$(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNestedComplexRhs = b.$(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
let a = b.$(1);
const tmpCalleeParam = a;
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpNestedComplexRhs = b.$(1);
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
let b = a.$( 1 );
const c = b;
if (b) {
  $( c );
}
else {
  const d = a.$( 1 );
  b = d;
  $( d );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
