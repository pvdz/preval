# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Ternary c > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = new (1, 2, b)[$("$")](1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(0) ? $(100) : (a = new (1, 2, b)[$(`\$`)](1)));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(0);
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  const tmpCompObj = b;
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  const tmpNestedComplexRhs = new tmpNewCallee(1);
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpCompProp /*:unknown*/ = $(`\$`);
  const b /*:object*/ = { $: $ };
  const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
  const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee(1);
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
const b = $( 0 );
if (b) {
  const c = $( 100 );
  $( c );
}
else {
  const d = $( "$" );
  const e = { $: $ };
  const f = e[ d ];
  const g = new f( 1 );
  a = g;
  $( g );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: '$'
 - 3: 1
 - 4: {}
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
