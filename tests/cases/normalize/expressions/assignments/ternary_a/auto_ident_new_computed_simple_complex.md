# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = new b[$("$")](1)) ? $(100) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
const tmpClusterSSA_a /*:object*/ = new tmpNewCallee(1);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`\$`);
const tmpNewCallee = { $: $ }[tmpCompProp];
const tmpClusterSSA_a = new tmpNewCallee(1);
$($(100));
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = new b[$(`\$`)](1)) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpCompObj = b;
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
a = new tmpNewCallee(1);
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
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
const d = new c( 1 );
const e = $( 100 );
$( e );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: 100
 - 5: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
