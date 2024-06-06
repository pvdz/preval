# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new ($(b)[$("$")])(1)) && (a = new ($(b)[$("$")])(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new ($(b)[$(`\$`)])(1)) && (a = new ($(b)[$(`\$`)])(1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`\$`);
  const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
let tmpClusterSSA_a = new tmpNewCallee(1);
const tmpCalleeParam = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`\$`);
  const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
  const tmpNestedComplexRhs = new tmpNewCallee$1(1);
  tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
let e = new d( 1 );
const f = e;
if (e) {
  const g = $( a );
  const h = $( "$" );
  const i = g[ h ];
  const j = new i( 1 );
  e = j;
  $( j );
}
else {
  $( f );
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: '$'
 - 6: 1
 - 7: {}
 - 8: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
