# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident call prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).$(1)) || (a = (1, 2, $(b)).$(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = (1, 2, $(b)).$(1)) || (a = (1, 2, $(b)).$(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallObj = $(b);
a = tmpCallObj.$(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallObj$1 = $(b);
  const tmpNestedComplexRhs = tmpCallObj$1.$(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
let tmpClusterSSA_a = tmpCallObj.$(1);
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  $(tmpCalleeParam);
} else {
  const tmpCallObj$1 = $(b);
  const tmpNestedComplexRhs = tmpCallObj$1.$(1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
let c = b.$( 1 );
const d = c;
if (c) {
  $( d );
}
else {
  const e = $( a );
  const f = e.$( 1 );
  c = f;
  $( f );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
