# Preval test case

# auto_ident_new_computed_simple_simple.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident new computed simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new b["$"](1)) || (a = new b["$"](1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new b[`\$`](1)) || (a = new b[`\$`](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpNewCallee = b.$;
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpNewCallee$1 = b.$;
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let tmpClusterSSA_a /*:unknown*/ = new $(1);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
} else {
  const tmpNestedComplexRhs /*:object*/ = new $(1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = new $( 1 );
if (a) {
  $( a );
}
else {
  const b = new $( 1 );
  a = b;
  $( b );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: {}
 - 3: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
