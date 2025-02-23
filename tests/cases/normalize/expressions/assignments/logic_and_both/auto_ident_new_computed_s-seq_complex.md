# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new (1, 2, b)[$("$")](1)) && (a = new (1, 2, b)[$("$")](1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new (1, 2, b)[$(`\$`)](1)) && (a = new (1, 2, b)[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCompObj$1 = b;
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
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
let tmpClusterSSA_a /*:unknown*/ = new tmpNewCallee(1);
const tmpCalleeParam /*:unknown*/ = tmpClusterSSA_a;
if (tmpClusterSSA_a) {
  const tmpCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$1 /*:unknown*/ = b[tmpCompProp$1];
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(1);
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
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
let d = new c( 1 );
const e = d;
if (d) {
  const f = $( "$" );
  const g = b[ f ];
  const h = new g( 1 );
  d = h;
  $( h );
}
else {
  $( e );
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: '$'
 - 4: 1
 - 5: {}
 - 6: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
