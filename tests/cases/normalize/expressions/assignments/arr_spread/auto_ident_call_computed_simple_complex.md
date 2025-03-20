# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$([...(a = b[$("$")](1))]);
$(a);
`````


## Settled


`````js filename=intro
const tmpCallCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const a /*:unknown*/ = b[tmpCallCompProp](1);
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const a = { $: $ }[tmpCallCompProp](1);
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 );
const d = [ ...c ];
$( d );
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
