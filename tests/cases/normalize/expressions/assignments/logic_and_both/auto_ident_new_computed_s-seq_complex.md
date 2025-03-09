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

## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
new tmpNewCallee(1);
const tmpCompProp$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = b[tmpCompProp$1];
const tmpNestedComplexRhs /*:object*/ = new tmpNewCallee$1(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCompProp];
new tmpNewCallee(1);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee$1 = b[tmpCompProp$1];
const tmpNestedComplexRhs = new tmpNewCallee$1(1);
$(tmpNestedComplexRhs);
$(tmpNestedComplexRhs);
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
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
new c( 1 );
const d = $( "$" );
const e = b[ d ];
const f = new e( 1 );
$( f );
$( f );
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same
